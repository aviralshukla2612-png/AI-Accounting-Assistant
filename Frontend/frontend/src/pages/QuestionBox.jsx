import React, { useState } from "react";
import axios from "axios";

const QuestionBox = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestion = async () => {
    if (!question.trim()) {
      setAnswer("Please enter a question");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/question",
        {
          question,
        }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.log(error);
      setAnswer("Error getting answer");
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
      <h2>Ask Business Question</h2>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleQuestion}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ask
      </button>

      <p style={{ marginTop: "20px" }}>
        <strong>{answer}</strong>
      </p>
    </div>
  );
};

export default QuestionBox;