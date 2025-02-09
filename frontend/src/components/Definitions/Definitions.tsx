import React, { useState } from 'react';
import VoteButtons from '../VoteButtons/VoteButtons';
// Types
interface Definition {
    word: string;
    definition: string;
    context: string;
    id: string;
    votes: {
      up: number;
      down: number;
    };
  }
  
  // Animation styles
  const slideAnimation = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  `;
  
  // Styles
  const styles = `
  .definitions-container {
    width: 400px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .empty-state {
    color: #666;
    text-align: center;
    font-style: italic;
    padding: 20px;
  }
  
  .definition-block {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    min-width: 300px;
    max-width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .word {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom: 2px solid #333;
    padding-bottom: 4px;
  }
  
  .section {
    margin: 12px 0;
  }
  
  .section-title {
    font-style: italic;
    color: #666;
    margin-bottom: 4px;
  }
  
  .votes {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    align-items: center;
    margin-top: 12px;
  }
  
  .vote-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  
  .vote-count {
    min-width: 24px;
    text-align: center;
  }
  
  .main-layout {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  
  .pdf-container {
    flex: 1;
    border-right: 1px solid #ddd;
    background: #f9f9f9;
  }
  `;
  
  // Component

  
  const DefinitionList: React.FC = () => {
    // Dummy data for demonstration
    const [definitions, setDefinitions] = useState<Definition[]>([
      {
        id: '1',
        word: 'Example',
        definition: 'A representative form or pattern',
        context: 'This is an example of how the definition block will look.',
        votes: { up: 10, down: 10 }
      }
    ]);
  
    const addDefinition = (newDef: Definition) => {
      setDefinitions(prev => {
        const updated = [newDef, ...prev];
        return updated.slice(0, 5); // Keep only the 5 most recent definitions
      });
    };
  
    return (
      <>
        <style>{styles}</style>
        <style>{slideAnimation}</style>
        
        <div className="main-layout">
          <div className="pdf-container">
            {/* PDF viewer component will go here */}
          </div>
          
          <div className="definitions-container">
            {definitions.length === 0 ? (
              <div className="empty-state">
                Start highlighting words for definitions!
              </div>
            ) : (
              definitions.map(def => (
                <div key={def.id} className="definition-block">
                  <div className="word">{def.word}</div>
                  
                  <div className="section">
                    <div className="section-title">/Definition/</div>
                    <div>{def.definition}</div>
                  </div>
                  
                  <div className="section">
                    <div className="section-title">/Context/</div>
                    <div>{def.context}</div>
                  </div>
                 <div className="vote-buttons"><VoteButtons /></div> 
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default DefinitionList;