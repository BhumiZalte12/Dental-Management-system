import React, { useState } from "react";

const FileUploader = ({ onFileSelect, accept = "image/*,application/pdf" }) => {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    onFileSelect(file); 
    const reader = new FileReader();

   
    if (file.type.startsWith("image/")) {
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload File
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-sky-50 file:text-sky-700
                   hover:file:bg-sky-100"
      />

      {fileName && (
        <p className="text-sm text-gray-600">
          Selected: <strong>{fileName}</strong>
        </p>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 w-40 h-auto rounded shadow border"
        />
      )}
    </div>
  );
};

export default FileUploader;
