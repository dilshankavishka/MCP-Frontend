"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emailResponse, setEmailResponse] = useState("");

  // Your backend API URL (change this after deploy)
  const API_BASE = "https://mcp-server-nze2.onrender.com";

  const handleAskCV = async () => {
    try {
      const res = await axios.post(`${API_BASE}/cv-query`, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error: " + err.message);
    }
  };

  const handleSendEmail = async () => {
    try {
      const res = await axios.post(`${API_BASE}/send-email`, {
        recipient,
        subject,
        body,
      });
      setEmailResponse(
        res.data.message + " Preview: " + (res.data.preview || "")
      );
    } catch (err) {
      setEmailResponse("Error: " + err.message);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MCP Playground</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Ask about CV</h2>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "300px", padding: "0.5rem", marginRight: "1rem" }}
        />
        <button onClick={handleAskCV}>Ask</button>
        {answer && (
          <p>
            <strong>Answer:</strong> {answer}
          </p>
        )}
      </section>

      <section>
        <h2>Send Email</h2>
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{
            display: "block",
            margin: "0.5rem 0",
            padding: "0.5rem",
            width: "300px",
          }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            display: "block",
            margin: "0.5rem 0",
            padding: "0.5rem",
            width: "300px",
          }}
        />
        <textarea
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            display: "block",
            margin: "0.5rem 0",
            padding: "0.5rem",
            width: "300px",
          }}
        />
        <button onClick={handleSendEmail}>Send Email</button>
        {emailResponse && (
          <p>
            <strong>Response:</strong> {emailResponse}
          </p>
        )}
      </section>
    </main>
  );
}
