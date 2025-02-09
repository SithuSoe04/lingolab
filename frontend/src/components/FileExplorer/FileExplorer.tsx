import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
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
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const navigate = useNavigate(); // Hook to navigate to PdfViewer
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/upload-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Successful:", response.data);

      // Redirect to PdfViewer after successful upload
      navigate("/pdfviewer", { state: { pdfFile: URL.createObjectURL(pdfFile), data: response.data }});

    } catch (error: any) {
      console.error("Upload failed:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
      {pdfFile && (
        <Button onClick={handleUpload} disabled={uploading} variant="contained" color="primary">
          {uploading ? "Uploading..." : "Upload & View"}
        </Button>
      )}
    </Box>
  );
};

export default FileExplorer;