import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Import routing components
import Header from "./components/Header"; // Import the Header component
import Form from "./components/Form";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGif, setLoadingGif] = useState(null);
  const [error, setError] = useState(null); // Added for better error display

  const fetchMenu = async (format, link, solution, customPrompt) => {
    try {
      setIsLoading(true);
      setError(null); // Reset error state before new request

      // Fetch a random "working hard" GIF from Giphy
      const giphyResponse = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=iwofztjecqmN0GOkweRb6kLO9NXE42Uc&tag=working+hard&rating=g`
      );
      const giphyResult = await giphyResponse.json();
      setLoadingGif(giphyResult.data.images.original.url);

      // Build the query parameters
      let queryParams = `format=${encodeURIComponent(format)}&link=${encodeURIComponent(link)}`;
      if (solution) {
        queryParams += `&solution=${encodeURIComponent(solution)}`;
      }

      // If custom prompt is provided, include it in the request body (as POST request)
      let response;
      if (customPrompt) {
        response = await fetch(`https://lkdevpython2.azurewebsites.net/api/lkdevbackend2?${queryParams}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customPrompt }),
        });
      } else {
        response = await fetch(`https://lkdevpython2.azurewebsites.net/api/lkdevbackend2?${queryParams}`);
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError(error.message || "An unknown error occurred."); // Set error message for display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Use the reusable Header component */}
      <Header />
      <div className="main-content">
        <Routes>
          {/* Define the main route for the form */}
          <Route
            path="/"
            element={
              <>
                <Form onFetch={fetchMenu} />
                {isLoading ? (
                  <div className="loading-container">
                    <img src={loadingGif} alt="Loading..." className="loading-gif" />
                    <p className="loading-text">Loading... Please wait!</p>
                  </div>
                ) : error ? (
                  <div className="error-container">
                    <p className="error-message">Error: {error}</p>
                  </div>
                ) : (
                  <Results data={data} />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
