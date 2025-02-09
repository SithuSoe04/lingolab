import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DefinitionRequestPage.css';

interface DefinitionData {
  word: string;
  definition: string;
  context?: string;
  fieldType: string;
  upvotes: number;
  downvotes: number;
}

const DefinitionRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [definitionData, setDefinitionData] = useState<DefinitionData | null>(null);
  const [newDefinition, setNewDefinition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get definition data from location state
    const data = location.state?.definitionData;
    if (data) {
      setDefinitionData(data);
    } else {
      // Redirect back if no data
      navigate('/');
    }
  }, [location, navigate]);

  const handleSubmit = async () => {
    if (!definitionData || !newDefinition.trim()) return;
  
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/submit-definition-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: definitionData.word,
          currentDefinition: definitionData.definition,
          newDefinition: newDefinition.trim(),
          fieldType: definitionData.fieldType,
          currentUpvotes: definitionData.upvotes,
          currentDownvotes: definitionData.downvotes,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Show success message
        navigate('/');
      } else {
        throw new Error(result.detail || 'Failed to submit request');
      }
    } catch (error:any) {
      console.error('Error submitting request:', error);
      alert(error.message || 'Failed to submit definition change request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!definitionData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="definition-request-page">
      <h1 className="page-title">Definition Change Request</h1>
      
      {/* Current Definition Card */}
      <div className="definition-card">
        <h2 className="word-title">{definitionData.word}</h2>
        
        <div className="definition-section">
          <h3 className="section-label">/Definition/</h3>
          <p className="definition-text">{definitionData.definition}</p>
        </div>
        
        {definitionData.context && (
          <div className="context-section">
            <h3 className="section-label">/Context/</h3>
            <p className="context-text">{definitionData.context}</p>
          </div>
        )}
        
        <div className="voting-section">
          <span className="vote-count">

          </span>
        </div>
      </div>

      {/* New Definition Form */}
      <div className="request-form">
        <h3 className="form-title">Write Definition Change Below</h3>
        <textarea
          value={newDefinition}
          onChange={(e) => setNewDefinition(e.target.value)}
          placeholder="Enter your proposed definition..."
          className="definition-input"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !newDefinition.trim()}
          className="submit-button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </div>
  );
};

export default DefinitionRequestPage;
