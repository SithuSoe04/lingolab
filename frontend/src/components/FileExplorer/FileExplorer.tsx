import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      navigate("/pdfviewer", { state: { pdfFile: URL.createObjectURL(pdfFile), uploadData: response.data }});

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
