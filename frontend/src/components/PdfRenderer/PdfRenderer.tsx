import React, { useState, useRef, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const wordDefinitions: { [key: string]: string } = {
  "react": "A JavaScript library for building user interfaces.",
  "pdf": "Portable Document Format, a file format for capturing and sending electronic documents in exactly the intended format.",
  "state": "A built-in React hook used to store values in functional components.",
  "found": "TEST ASDASDASDS",
  // Add more words and definitions as needed
};

const PdfRenderer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const viewerRef = useRef<any>(null);

  const handleSelection = (e: any) => {
    e.stopPropagation();
    const selectedText = window.getSelection()?.toString().trim().toLowerCase();
    if (selectedText && wordDefinitions[selectedText]) {
      setSelectedWord(selectedText);
      setDefinition(wordDefinitions[selectedText]);
    } else {
      setSelectedWord(null);
      setDefinition(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection); // Listen for text selection
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '700px', position: 'relative' }}>
      
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={fileUrl}
          ref={viewerRef}
        />
      </Worker>

      {/* Definition popup */}
      {selectedWord && definition && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
          }}
        >
          <strong>{selectedWord}</strong>
          <p>{definition}</p>
        </div>
      )}
    </div>
  );
};

export default PdfRenderer;
