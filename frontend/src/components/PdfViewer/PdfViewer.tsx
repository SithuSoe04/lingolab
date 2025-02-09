import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';

const PdfViewer = () => {
  const location = useLocation();
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
      // const wordEntry = wordDefinitions.find((entry: { word: string; }) => entry.word === selectedText);
      // if (wordEntry) {
      //   setSelectedWords((prevWords) => {
      //     const updatedWords = [wordEntry, ...prevWords]; // Add the selected word at the beginning

      //     // Keep only the last 3 words selected
      //     if (updatedWords.length > 3) {
      //       updatedWords.pop(); // Remove the last word if there are more than 3
      //     }

      //     return updatedWords;
      //   });
      // }

      // Call the backend to search the vocabulary
      try {
        const response = await axios.get(`http://localhost:8000/search-vocabulary/${documentType.toLowerCase()}/${selectedText}`);
        const searchResults = response.data.data;

        // Update the selected words with search results
        if (searchResults.length > 0) {
          setSelectedWords((prevWords) => {
            const updatedWords = [
              ...searchResults.map((result: any) => ({
                word: result.word,
                definition: result.definition,
                context: result.context,
              })),
              ...prevWords, // Add the previous words after the new ones
            ];

            // Keep only the last 4 words selected
            if (updatedWords.length > 4) {
              updatedWords.pop(); // Remove the last word if there are more than 4
            }

            return updatedWords;
          });
        } else {
          //alert('No definition found for this word.');
          // If the word is not found, show a placeholder "Loading..."
          setSelectedWords((prevWords) => [
            { word: selectedText, definition: "Loading...", context: "" },
            ...prevWords,
          ]);
          // Query OpenAI backend API for a new definition
          const openAiResponse = await axios.get(`http://localhost:8000/generate-singular-definition/${documentType.toLowerCase()}/${selectedText}`);
          const newDefinition = openAiResponse.data.words[0].definition;
          const newContext = openAiResponse.data.words[0].context;

          // Update the UI with the actual definition
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

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', marginTop: '6rem' }}>
      {/* Fixed PDF Container */}
      <Box sx={{ width: '70%', position: 'fixed', height: '100vh', overflowY: 'auto', padding: '1rem' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfFile} ref={viewerRef} />
        </Worker>
      </Box>

      {/* Scrollable Dictionary Section */}
      <Box sx={{ width: '30%', marginLeft: '70%', height: '100vh', overflowY: 'auto', padding: '1rem' }}>
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
      </Box>
    </Box>
  );
};
export default PdfViewer;

// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from 'react-router-dom';
// import { Box } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import axios from 'axios';

// const PdfViewer = () => {
//   const location = useLocation();
//   const documentType = location.state?.data.type;

//   // Attempt to load PDF file from localStorage on page load
//   const storedPdfFile = localStorage.getItem('pdfFile');
//   const [pdfFile, setPdfFile] = useState<string | null>(storedPdfFile || null);
  
//   const wordDefinitions = location.state?.data.words; 

//   const [selectedWords, setSelectedWords] = useState<{ word: string, definition: string, context: string }[]>([]); 
//   const viewerRef = useRef<any>(null);

//   const handleSelection = async (e: any) => {
//     e.stopPropagation();
//     e.preventDefault();
//     const selectedText = window.getSelection()?.toString().trim().toLowerCase();
//     if (selectedText) {
//       try {
//         const response = await axios.get(`http://localhost:8000/search-vocabulary/${documentType.toLowerCase()}/${selectedText}`);
//         const searchResults = response.data.data;

//         if (searchResults.length > 0) {
//           setSelectedWords((prevWords) => {
//             const updatedWords = [
//               ...searchResults.map((result: any) => ({
//                 word: result.word,
//                 definition: result.definition,
//                 context: result.context,
//               })),
//               ...prevWords,
//             ];

//             if (updatedWords.length > 4) {
//               updatedWords.pop();
//             }

//             return updatedWords;
//           });
//         } else {
//           setSelectedWords((prevWords) => [
//             { word: selectedText, definition: "Loading...", context: "" },
//             ...prevWords,
//           ]);

//           const openAiResponse = await axios.get(`http://localhost:8000/generate-singular-definition/${documentType.toLowerCase()}/${selectedText}`);
//           const newDefinition = openAiResponse.data.words[0].definition;
//           const newContext = openAiResponse.data.words[0].context;

//           setSelectedWords((prevWords) =>
//               prevWords.map((wordObj) =>
//                   wordObj.word === selectedText
//                       ? { word: selectedText, definition: newDefinition, context: newContext }
//                       : wordObj
//               )
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching vocabulary data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Listen for selection and update selected words
//     document.addEventListener('mouseup', handleSelection);

//     // Handle localStorage and pdfFile
//     const handleFileFromStorage = () => {
//       const storedPdfFile = localStorage.getItem('pdfFile');
//       if (storedPdfFile) {
//         setPdfFile(storedPdfFile); // Set PDF from localStorage
//       }
//     };

//     handleFileFromStorage();  // Try to get pdfFile from localStorage

//     return () => {
//       document.removeEventListener('mouseup', handleSelection);
//     };
//   }, []);

//   useEffect(() => {
//     // Store pdfFile to localStorage whenever it changes
//     if (pdfFile) {
//       localStorage.setItem('pdfFile', pdfFile);
//     }
//   }, [pdfFile]);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', marginTop: '6rem' }}>
//       {/* Fixed PDF Container */}
//       <Box sx={{ width: '70%', position: 'fixed', height: '100vh', overflowY: 'auto', padding: '1rem' }}>
//         {pdfFile && (
//           <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
//             <Viewer fileUrl={pdfFile} ref={viewerRef} />
//           </Worker>
//         )}
//       </Box>

//       {/* Scrollable Dictionary Section */}
//       <Box sx={{ width: '30%', marginLeft: '70%', height: '100vh', overflowY: 'auto', padding: '1rem' }}>
//         <h1>Dictionary</h1>
//         {selectedWords.length > 0 ? (
//           selectedWords.map((wordData, index) => (
//             <div key={index}>
//               <strong>{wordData.word}</strong>
//               <p><strong>Definition:</strong> {wordData.definition}</p>
//               <p><strong>Context:</strong> {wordData.context}</p>
//               <hr />
//             </div>
//           ))
//         ) : (
//           <p>No words selected yet.</p>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default PdfViewer;
