import React, { useState } from "react";
import "./Form.css";

function Form({ onFetch }) {
  const [format, setFormat] = useState("");
  const [link, setLink] = useState("");
  const [solution, setSolution] = useState("");

  // Available format options
  const formatOptions = ["TEXT", "PDF", "IMAGE", "FACEBOOK POST", "DYNAMIC"];

  // Available solutions for PDF
  const solutionOptions = [
    { id: 1, label: "Solution 1: Contour Detection for Specific Area (Lunch Menu)" },
    { id: 2, label: "Solution 2: Text Extraction (Selectable Text with OCR Fallback)" },
    { id: 3, label: "Solution 3: OCR for Entire PDF (No Selectable Text, just an image)" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFetch) {
      onFetch(format, link, solution); // Include solution in the API call
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="format">Select Format</label>
        <select
          id="format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose format
          </option>
          {formatOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="link">Enter URL</label>
        <input
          id="link"
          type="url"
          placeholder="Enter URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>

      {format === "PDF" && (
        <div className="form-group">
          <label htmlFor="solution">Select Solution for PDF</label>
          <select
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose solution
            </option>
            {solutionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Fetch Menu</button>
    </form>
  );
}

export default Form;
