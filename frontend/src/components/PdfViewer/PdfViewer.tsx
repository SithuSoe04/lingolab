import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const pdfFile = location.state?.pdfFile;
  const wordDefinitions = location.state?.data.words; 
  const documentType = location.state?.data.type;
  console.log(documentType);

  const [selectedWords, setSelectedWords] = useState<{ word: string, definition: string, context: string }[]>([]); 
  const viewerRef = useRef<any>(null);

  const handleSelection = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedText = window.getSelection()?.toString().trim().toLowerCase();
    if (selectedText) {
      try {
        const response = await axios.get(`http://localhost:8000/search-vocabulary/${documentType.toLowerCase()}/${selectedText}`);
        const searchResults = response.data.data;

        if (searchResults.length > 0) {
          setSelectedWords((prevWords) => {
            const updatedWords = [
              ...searchResults.map((result: any) => ({
                word: result.word,
                definition: result.definition,
                context: result.context,
              })),
              ...prevWords,
            ];

            if (updatedWords.length > 4) {
              updatedWords.pop();
            }

            return updatedWords;
          });
        } else {
          setSelectedWords((prevWords) => [
            { word: selectedText, definition: "Loading...", context: "" },
            ...prevWords,
          ]);

          // Query OpenAI backend API for a new definition
          const openAiResponse = await axios.get(`http://localhost:8000/generate-singular-definition/${documentType.toLowerCase()}/${selectedText}`);

          const newDefinition = openAiResponse.data.definition;
          const newContext = openAiResponse.data.context;

          setSelectedWords((prevWords) =>
            prevWords.map((wordObj) =>
              wordObj.word === selectedText
                ? { word: selectedText, definition: newDefinition, context: newContext }
                : wordObj
            )
          );
        }
      } catch (error) {
        console.error("Error fetching vocabulary data:", error);
      }
    }
  };

  // Function to handle navigation to the DefinitionRequestPage
  const handleRequestChanges = (wordData: { word: string, definition: string, context: string }) => {
    navigate('/request-change', {
      state: {
        definitionData: {
          word: wordData.word,
          definition: wordData.definition,
          context: wordData.context,
          fieldType: documentType,
          upvotes: 0, // Placeholder values
          downvotes: 0, // Placeholder values
        },
      },
    });
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  return (
    <Box>
      <Grid container sx={{ margin: 0, padding: 0, marginTop: '0.5rem' }}>
        <Grid size={9}>
          <div style={{ width: '100%', height: '700px', position: 'relative' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
              <Viewer fileUrl={pdfFile} ref={viewerRef} />
            </Worker>
          </div>
        </Grid>
        <Grid size={3}>
          <h1>Dictionary</h1>
          {selectedWords.length > 0 ? (
            selectedWords.map((wordData, index) => (
              <div key={index}>
                <strong>{wordData.word}</strong>
                <p><strong>Definition:</strong> {wordData.definition}</p>
                <p><strong>Context:</strong> {wordData.context}</p>
                <button
                  onClick={() => handleRequestChanges(wordData)} // Add button for navigation
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Request Changes
                </button>
                <hr />
              </div>
            ))
          ) : (
            <p>No words selected yet.</p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default PdfViewer;
