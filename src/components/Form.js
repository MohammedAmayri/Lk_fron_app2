import React, { useState } from "react";
import "./Form.css";

function Form({ onFetch }) {
  const [format, setFormat] = useState("");
  const [link, setLink] = useState("");
  const [solution, setSolution] = useState("");
  const [adjustPrompt, setAdjustPrompt] = useState(false);

  // The default prompt
  const defaultPrompt = `
Extract the lunch menu for the week from the following text and format it as a JSON array with the following fields:
- "name": Dish name
- "description": Brief description
- "price": Price as a number (no currency symbols)
- "availability": Days when the dish is available (e.g., ["Monday", "Tuesday", "Wednesday"]). Use only the days explicitly mentioned. If no days are mentioned, leave it empty.
- "allergies": Possible food allergies (e.g., 'milk', 'gluten', etc.), if clearly indicated.
- "tags": Relevant tags such as "Vegetarian", "Vegan", "Gluten-Free".
- "week": Week number (e.g., 34 for V34). If no week number is present, send back the first clear date that you see as part of the text (turning it to week number of year 2024).

Additional guidelines:
1. Ignore all items after the word "À la carte at all times".
2. Ignore any irrelevant or gibberish data before generating the menus.
3. Do not assign availability to days not explicitly mentioned. If no days are specified, leave "availability" empty.
4. If no allergies or tags are specified, leave those fields as empty lists.
5. For prices, include only the numeric value without currency symbols.
6. Ensure the output is a JSON array with the specified fields.
7. Do not add any new lunch menus not mentioned in the input text.
8. If the week number is of 3 digits, get rid of the last one.
9. If the name gets too long, try to shorten it to 2 to 3 words and put the rest in the description instead.
10. It's extremely important to always remember to add the tags for vegan and vegetarian dishes.
11. if the price for the menu is mentioned, add it to every lunch if its not changed with special price.
12. To make sure that the week number is correct use one or multiple mentioned dates with the days (if exist), use the date knowing its the year 2024 to calculate the week number
Text:
\"\"\"{menu_text}\"\"\".

Return only the JSON array with the fields as specified. Do not include any code snippets or code block markers in your response. For availability, use exact weekday names (Monday, Tuesday, etc.).
`;

  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);

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
      onFetch(format, link, solution, adjustPrompt ? customPrompt : null);
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

 {/* New section for prompt adjustment */}
<div className="form-group prompt-adjustment">
  <label className="adjustment-label">Would you like to adjust the prompt?</label>
  <div className="adjustment-options">
    <label className="adjustment-option">
      <input
        type="radio"
        value={false}
        checked={!adjustPrompt}
        onChange={() => setAdjustPrompt(false)}
        className="adjustment-radio"
      />
      No
    </label>
    <label className="adjustment-option">
      <input
        type="radio"
        value={true}
        checked={adjustPrompt}
        onChange={() => setAdjustPrompt(true)}
        className="adjustment-radio"
      />
      Yes
    </label>
  </div>
</div>


      {/* Text area for custom prompt */}
      {adjustPrompt && (
        <div className="form-group">
          <label htmlFor="customPrompt">
          Adjust the prompt as needed, use the default prompt as a base and leave <code>{'{menu_text}'}</code> unchanged.
          </label>
          <textarea
            id="customPrompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={10}
            cols={50}
          />
        </div>
      )}

      <button type="submit">Fetch Menu</button>
    </form>
  );
}

export default Form;
