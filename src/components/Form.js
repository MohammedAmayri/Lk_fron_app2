import React, { useState } from "react";
import "./Form.css";

function Form({ onFetch }) {
  const [format, setFormat] = useState("");
  const [link, setLink] = useState("");

  // Available format options
  const formatOptions = ["TEXT", "PDF", "IMAGE", "FACEBOOK POST", "DYNAMIC"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFetch) {
      onFetch(format, link);
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

      <button type="submit">Fetch Menu</button>
    </form>
  );
}

export default Form;
