import React, { useState } from "react";
import axios from "axios";

export const FileUpload = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const fileType = selectedFile.name
      .split(".")
      .pop()
      .toLowerCase();

    if (fileType !== "csv" && fileType !== "xlsx") {
      setFile(null);
      setMessage("Please upload a CSV or XLSX file");
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setData(response.data.data);

      setMessage(
        `File "${file.name}" uploaded successfully`
      );
    } catch (error) {
      console.log(error);

      setMessage("Upload failed");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>Upload Accounting Data</h2>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {file && (
        <p>
          <strong>Selected File:</strong> {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload File
      </button>

      <p style={{ marginTop: "10px" }}>
        Supports CSV and XLSX files
      </p>

      <p>{message}</p>
    </div>
  );
};