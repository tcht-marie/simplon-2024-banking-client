import React from 'react';
import Loader from './Loader';
import './FeedSwitch.css';

export default function FeedSwitch({ currentFeed, isLoading, onChange }) {
  return (
    <button
      className="feed-switch"
      aria-label='Button to switch between trengind and newest.'
      onClick={onChange}
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
    >
      {isLoading && <Loader />}{currentFeed ? '🔥 Trending' : '⭐ Newest'}
    </button>
  );
}
