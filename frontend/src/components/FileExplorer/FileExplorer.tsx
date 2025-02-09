import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResearchList from '../ResearchList/ResearchList';

const styles = `
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.upload-button-wrapper {
  position: relative;
  display: inline-block;
}

.upload-button {
  background-color: #D3D3D3;
  color: white;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-family: monospace;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background-color: #C0C0C0;
}

.upload-icon {
  width: 1.2em;
  height: 1.2em;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin: 2rem 0;
}
`;

const FileExplorer = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      navigate('/pdfviewer', { state: { pdfFile: fileUrl } });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Box className="file-upload-container">
        <div className="upload-button-wrapper">
          <button className="upload-button">
            Upload File
            <svg 
              className="upload-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </button>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        
        <div className="divider" />
        
        <ResearchList />
      </Box>
    </>
  );
};

export default FileExplorer;