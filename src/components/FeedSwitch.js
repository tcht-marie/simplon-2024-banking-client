import React from 'react';
import './FeedSwitch.css';

export default function FeedSwitch({ currentFeed, onChange }) {
  return (
    <button 
      className="feed-switch"
      onClick={() => onChange(!currentFeed)}
    >
      {currentFeed ? '🔥 Trending' : '⭐ Newest'}
    </button>
  );
}
