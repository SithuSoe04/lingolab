// // import React from "react";
// // import { useLocation } from 'react-router-dom';
// // import { Box } from "@mui/material";
// // import Grid from '@mui/material/Grid2';
// // import PdfRenderer from "../PdfRenderer/PdfRenderer";

// // const PdfViewer = () => {
// //   const location = useLocation();
// //   const pdfFile = location.state?.pdfFile;

// //   return (
// //     <Box>
// //        <Grid container sx={{margin: 0, padding: 0}} >
// //         <Grid size={9}>
// //           {pdfFile ? (
// //             <PdfRenderer fileUrl={pdfFile} />
// //           ) : (
// //             <p>No PDF selected</p>
// //           )}
// //         </Grid >
// //         <Grid size={3}>
// //           <h1>Dictionary</h1>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default PdfViewer;

// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from 'react-router-dom';
// import { Box } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PdfViewer = () => {


//   const location = useLocation();
//   const pdfFile = location.state?.pdfFile;
//   // var wordDefinitions = [
//   //   { word: "react", definition: "A JavaScript library for building user interfaces.", context: "React is used for building UI components." },
//   //   { word: "pdf", definition: "Portable Document Format, a file format for capturing and sending electronic documents in exactly the intended format.", context: "PDF files are commonly used for official documents." },
//   //   { word: "state", definition: "A built-in React hook used to store values in functional components.", context: "State allows React components to be dynamic and interactive." },
//   //   { word: "found", definition: "TEST ASDASDASDS", context: "A test definition entry." },
//   //   // Add more words as needed
//   // ];
//   const [wordDefinitions, setWordDefinitions] = useState<any[]>(location.state?.data.words);
//   const wordData = location.state?.data;
//   console.log(wordData.words);
//   console.log(wordDefinitions);

//   const [selectedWord, setSelectedWord] = useState<string | null>(null);
//   const [definition, setDefinition] = useState<string | null>(null);
//   const [context, setContext] = useState<string | null>(null);
//   const viewerRef = useRef<any>(null);

//   const handleSelection = (e: any) => {
//     e.stopPropagation();
//     e.preventDefault();
//     const selectedText = window.getSelection()?.toString().trim().toLowerCase();
//     if (selectedText) {
//       const wordEntry = wordDefinitions.find((entry) => entry.word === selectedText);
//       if (wordEntry) {
//         setSelectedWord(wordEntry.word);
//         setDefinition(wordEntry.definition);
//         setContext(wordEntry.context);
//       } else {
//         setSelectedWord(null);
//         setDefinition(null);
//         setContext(null);
//       }
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mouseup', handleSelection);
//     return () => {
//       document.removeEventListener('mouseup', handleSelection);
//     };
//   }, []);

//   return (
//     <Box>
//       <Grid container sx={{ margin: 0, padding: 0, marginTop: '0.5rem' }}>
//         <Grid size={9}>
//           <div style={{ width: '100%', height: '700px', position: 'relative' }}>
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
//               <Viewer fileUrl={pdfFile} ref={viewerRef} />
//             </Worker>
//           </div>
//         </Grid>
//         <Grid size={3}>
//           <h1>Dictionary</h1>
//           {selectedWord && definition && (
//             <div>
//               <strong>{selectedWord}</strong>
//               <p><strong>Definition:</strong> {definition}</p>
//               <p><strong>Context:</strong> {context}</p>
//             </div>
//           )}
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
  const location = useLocation();
  const pdfFile = location.state?.pdfFile;
  const wordDefinitions = location.state?.data.words; // Assuming the word definitions are passed in 'data.words'

  const [selectedWords, setSelectedWords] = useState<{ word: string, definition: string, context: string }[]>([]); 
  const viewerRef = useRef<any>(null);

  const handleSelection = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedText = window.getSelection()?.toString().trim().toLowerCase();
    if (selectedText) {
      const wordEntry = wordDefinitions.find((entry: { word: string; }) => entry.word === selectedText);
      if (wordEntry) {
        setSelectedWords((prevWords) => {
          const updatedWords = [wordEntry, ...prevWords]; // Add the selected word at the beginning

          // Keep only the last 3 words selected
          if (updatedWords.length > 3) {
            updatedWords.pop(); // Remove the last word if there are more than 3
          }

          return updatedWords;
        });
      }
    }
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
