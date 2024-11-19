import React, { useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";
import "./App.css";

function App()
{
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingGif, setLoadingGif] = useState(null);

    const fetchMenu = async (format, link) =>
    {
        try
        {
            setIsLoading(true);

            // Fetch a random "working hard" GIF from Giphy
            const giphyResponse = await fetch(
                `https://api.giphy.com/v1/gifs/random?api_key=iwofztjecqmN0GOkweRb6kLO9NXE42Uc&tag=working+hard&rating=g`
            );
            const giphyResult = await giphyResponse.json();
            setLoadingGif(giphyResult.data.images.original.url);

            // Fetch menu data from the backend API
            const response = await fetch(
                `https://lkdevpython2.azurewebsites.net/api/lkdevbackend2?format=${format}&link=${link}`
            );
            const result = await response.json();
            setData(result);
        } catch (error)
        {
            console.error("Error fetching menu:", error);
        } finally
        {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Menu Scraper</h1>
            </header>
            <Form onFetch={fetchMenu} />
            {isLoading ? (
                <div className="loading-container">
                    <img src={loadingGif} alt="Loading..." className="loading-gif" />
                    <p>Loading... Please wait!</p>
                </div>
            ) : (
                <Results data={data} />
            )}
        </div>
    );
}

export default App;
