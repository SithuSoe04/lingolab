// import React from "react";
// import { useLocation } from 'react-router-dom';
// import { Box } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import PdfRenderer from "../PdfRenderer/PdfRenderer";

// const PdfViewer = () => {
//   const location = useLocation();
//   const pdfFile = location.state?.pdfFile;

//   return (
//     <Box>
//        <Grid container sx={{margin: 0, padding: 0}} >
//         <Grid size={9}>
//           {pdfFile ? (
//             <PdfRenderer fileUrl={pdfFile} />
//           ) : (
//             <p>No PDF selected</p>
//           )}
//         </Grid >
//         <Grid size={3}>
//           <h1>Dictionary</h1>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default PdfViewer;

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {
  const wordDefinitions: { [key: string]: string } = {
    "react": "A JavaScript library for building user interfaces.",
    "pdf": "Portable Document Format, a file format for capturing and sending electronic documents in exactly the intended format.",
    "state": "A built-in React hook used to store values in functional components.",
    "found": "TEST ASDASDASDS",
    // Add more words and definitions as needed
  };

  const location = useLocation();
  const pdfFile = location.state?.pdfFile;

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [definition, setDefinition] = useState<string | null>(null);
    const viewerRef = useRef<any>(null);
  
    const handleSelection = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      const selectedText = window.getSelection()?.toString().trim().toLowerCase();
      if (selectedText && wordDefinitions[selectedText]) {
        setSelectedWord(selectedText);
        console.log(selectedText);
        setDefinition(wordDefinitions[selectedText]);
        console.log(wordDefinitions[selectedText]);
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
    <Box>
       <Grid container sx={{margin: 0, padding: 0, marginTop: '0.5rem'}} >
        <Grid size={9}>
          <div style={{ width: '100%', height: '700px', position: 'relative' }}> 
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
                  <Viewer
                    fileUrl={pdfFile}
                    ref={viewerRef}
                  />
                </Worker>
              </div>
        </Grid >
        <Grid size={3}>
          <h1>Dictionary</h1>
            {selectedWord && definition && (
              <div>
                <strong>{selectedWord}</strong>
                <p>{definition}</p>
              </div>
            )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PdfViewer;