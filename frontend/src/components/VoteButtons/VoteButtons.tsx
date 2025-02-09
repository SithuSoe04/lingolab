// VoteButtons.tsx
import React, { useState } from 'react';
import './VoteButtons.css';

const VoteButtons = () => {
  const [upvotes, setUpvotes] = useState(10);
  const [downvotes, setDownvotes] = useState(10);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvotes(upvotes - 1);
      setUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setUpvoted(true);
      if (downvoted) {
        setDownvotes(downvotes - 1);
        setDownvoted(false);
      }
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setDownvotes(downvotes - 1);
      setDownvoted(false);
    } else {
      setDownvotes(downvotes + 1);
      setDownvoted(true);
      if (upvoted) {
        setUpvotes(upvotes - 1);
        setUpvoted(false);
      }
    }
  };

  return (
    <div className="vote-container">
      <div className="vote-button-container">
        <button className="vote-button" onClick={handleUpvote}>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            className="vote-icon"
          >
            <path 
              d="M3 12h4v8h10v-8h4l-9-9-9 9z" 
              fill={upvoted ? '#000' : 'none'} 
              stroke="black" 
              strokeWidth="2"
            />
          </svg>
        </button>
        <span className="vote-count">{upvotes}</span>
      </div>

      <div className="vote-button-container">
        <button className="vote-button" onClick={handleDownvote}>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            className="vote-icon"
          >
            <path 
              d="M3 12h4v-8h10v8h4l-9 9-9-9z" 
              fill={downvoted ? '#000' : 'none'} 
              stroke="black" 
              strokeWidth="2"
            />
          </svg>
        </button>
        <span className="vote-count">{downvotes}</span>
      </div>
    </div>
  );
};

export default VoteButtons;