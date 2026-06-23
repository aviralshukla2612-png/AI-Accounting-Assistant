import React, { useState } from "react";
import { FileUpload } from "./pages/FileUpload";
import DataTable from "./pages/DataTable";
import QuestionBox from "./pages/QuestionBox";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        AI Accounting Assistant
      </h1>

      <FileUpload setData={setData} />

      <div
        style={{
          width: "500px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
          }}
        />
      </div>

      <DataTable data={data} search={search} />

      <QuestionBox />
    </div>
  );
}

export default App;