// src/components/ResearchList/ResearchList.tsx
import React from 'react';
import './ResearchList.css';

interface ResearchPaper {
  id: number;
  title: string;
  url: string; // Wikipedia URL
}

const ResearchList: React.FC = () => {
  const papers: ResearchPaper[] = [
    { 
      id: 1, 
      title: 'Research Paper 1 - Early Human History', 
      url: 'https://en.wikipedia.org/wiki/Human_history'
    },
    { 
      id: 2, 
      title: 'Research Paper 2 - Ancient Civilizations', 
      url: 'https://en.wikipedia.org/wiki/Ancient_civilization'
    },
    { 
      id: 3, 
      title: 'Research Paper 3 - Middle Ages', 
      url: 'https://en.wikipedia.org/wiki/Middle_Ages'
    },
    { 
      id: 4, 
      title: 'Research Paper 4 - Renaissance', 
      url: 'https://en.wikipedia.org/wiki/Renaissance'
    },
    { 
      id: 5, 
      title: 'Research Paper 5 - Industrial Revolution', 
      url: 'https://en.wikipedia.org/wiki/Industrial_Revolution'
    }
  ];

  const handleClick = (url: string): void => {
    // Open in new tab
    window.open(url, '_blank');
  };

  return (
    <div className="research-container">
      <h1 className="research-title">History</h1>
      <div className="research-list">
        {papers.map((paper) => (
          <button
            key={paper.id}
            className="research-button"
            onClick={() => handleClick(paper.url)}
            type="button"
          >
            {paper.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResearchList;