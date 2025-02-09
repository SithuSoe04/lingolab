import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FileExplorer = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to navigate to PdfViewer

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      
      // Redirect to PdfViewer after file is selected
      navigate('/pdfviewer', { state: { pdfFile: fileUrl } });
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
    </Box>
  );
};

export default FileExplorer;
