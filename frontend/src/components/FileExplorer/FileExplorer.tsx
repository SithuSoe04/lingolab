import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Typography } from "@mui/material";
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
      navigate("/pdfviewer", { state: { pdfFile: URL.createObjectURL(pdfFile), data: response.data }});

    } catch (error: any) {
      console.error("Upload failed:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    // <Box sx={{marginTop: '6rem'}}>
    //   <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
    //   {pdfFile && (
    //     <Button onClick={handleUpload} disabled={uploading} variant="contained" color="primary">
    //       {uploading ? "Uploading..." : "Upload & View"}
    //     </Button>
    //   )}
    // </Box>
    <Box 
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4"
    }}
  >
    <Paper 
      elevation={6}
      sx={{
        width: "400px",
        padding: "2rem",
        borderRadius: "1rem",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upload a PDF
      </Typography>
      <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handleFileChange} 
        style={{
          fontSize: "1rem", 
          textAlign: "center", 
          width: "100%", 
          padding: "0.5rem", 
          borderRadius: "0.5rem",
          border: "1px solid #ccc", 
        }} 
      />
    </Box>
      {pdfFile && (
        <Button 
          onClick={handleUpload} 
          disabled={uploading} 
          variant="contained" 
          color="primary" 
          sx={{ 
            marginTop: "1.5rem", 
            fontSize: "1rem", 
            padding: "0.75rem 2rem" 
          }}
        >
          {uploading ? "Uploading..." : "Upload & View"}
        </Button>
      )}
    </Paper>
  </Box>
  );
};

export default FileExplorer;