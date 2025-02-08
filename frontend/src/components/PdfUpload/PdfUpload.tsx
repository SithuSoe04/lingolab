import React, {useState} from "react";
import PdfViewer from "../PdfViewer/PdfViewer";

const PdfUpload = () => {
const [pdfFile, setPdfFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      {pdfFile && <PdfViewer fileUrl={pdfFile} />}
    </div>
  );
};
export default PdfUpload;
