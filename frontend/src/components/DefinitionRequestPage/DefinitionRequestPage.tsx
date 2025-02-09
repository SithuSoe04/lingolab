// DefinitionRequestPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DefinitionRequestPage.css';

// Dummy data for demonstration
const DUMMY_DEFINITION_DATA = {
  word: "Mitochondria",
  definition: "A double-membrane-bound organelle found in most eukaryotic organisms. Mitochondria are often referred to as the powerhouses of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
  context: "In cellular biology, mitochondria play a crucial role in energy production and are essential for cellular respiration. Their presence or absence often distinguishes between different types of cells.",
  fieldType: "biology",
  upvotes: 125,
  downvotes: 12
};

const DefinitionRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [newDefinition, setNewDefinition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newDefinition.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Definition change request submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit definition change request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="definition-request-page">
      <h1 className="page-title">Definition Change Request</h1>
      
      <div className="definition-card">
        <h2 className="word-title">{DUMMY_DEFINITION_DATA.word}</h2>
        
        <div className="definition-section">
          <h3 className="section-label">/Definition/</h3>
          <p className="definition-text">{DUMMY_DEFINITION_DATA.definition}</p>
        </div>
        
        <div className="context-section">
          <h3 className="section-label">/Context/</h3>
          <p className="context-text">{DUMMY_DEFINITION_DATA.context}</p>
        </div>
        
        <div className="voting-section">
          <span className="vote-count">
            <span>{DUMMY_DEFINITION_DATA.upvotes}</span>
          </span>
          <span className="vote-count">
            <span>{DUMMY_DEFINITION_DATA.downvotes}</span>
          </span>
        </div>
      </div>

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