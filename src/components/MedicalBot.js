import React, { useState } from "react";
import axios from "axios";
import "./MedicalBot.css";

function MedicalBot({ onRecommend }) {
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!symptoms.trim()) {
      alert("Please enter symptoms");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:9000/recommend",
        { symptoms }
      );
      onRecommend(res.data);
      setOpen(false);
    } catch {
      alert("Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="bot-fab" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Chat Box */}
      {open && (
        <div className="bot-box">
          <h4>Medical Assistant</h4>

          <textarea
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <button onClick={handleRecommend}>
            {loading ? "Analyzing..." : "Recommend"}
          </button>
        </div>
      )}
    </>
  );
}

export default MedicalBot;
