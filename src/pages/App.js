import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Post from "../components/Post";
import Login from "../components/Login";
import FeedSwitch from "../components/FeedSwitch";
import { useAuth, AuthProvider } from "../contexts/AuthContext";
import { getNewestPosts, getTrendingPosts /*, getNewestPosts */ } from "../services/postService";

const TRENDING_FEED=true;
const NEWEST_FEED=true;

function AppContent() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState({content: []});
  const [currentFeed, setCurrentFeed] = useState(TRENDING_FEED);
  
  useEffect(() => {
    if (auth) {
      const feed = currentFeed ? getTrendingPosts(auth) : getNewestPosts(auth);
      feed
        .then(setPosts)
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [auth, currentFeed]);

  const [postsMap, owners] = useMemo(() => {
    const ownersMap = new Map();
    const postsMap = new Map();
    
    [...posts.content,
      ...posts.content
        .flatMap(post=>post.attachments)
        .filter(attachment=>attachment?.type==='post')
    ].forEach(post => {
      // Store post in lookup map
      postsMap.set(post.id, post);
      
      // Store owner info
      if (typeof post.owner === 'object') {
        ownersMap.set(post.owner.id, post.owner);
      }
      post.likes?.forEach(like => {
        if (typeof like === 'object') {
          ownersMap.set(like.id, like);
        }
      });
    });
    
    return [postsMap, ownersMap];
  }, [posts]);

  function getPost(id) {
    return postsMap.get(id);
  }
  function getOwner(id) { 
    return owners.get(id);
  }
  
  // Only render login if not authenticated
  if (!auth) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <h1 className="header-title">Miniature</h1>
      <FeedSwitch currentFeed={currentFeed} onChange={setCurrentFeed}></FeedSwitch>
      <div className="posts-container">
        {posts.content?.map(post => {
          const owner = typeof post.owner === 'object'
            ? post.owner 
            : getOwner(post.owner);
          
          return (
            <Post
              key={`post-${post.id}`}
              id={post.id}
              username={owner.username}
              avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${owner.username}`}
              attachments={post.attachments || []}
              getPost={getPost}
              getOwner={getOwner}
            >
              {post.content}
            </Post>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
