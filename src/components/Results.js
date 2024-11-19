import React from "react";
import "./Results.css";

function Results({ data }) {
    if (!data || !data.lunch_menus) {
        return <p className="no-results">No results to display.</p>;
    }

    return (
        <div className="results-container">
            <h2 className="results-title">Menu Results</h2>
            <div className="menu-items">
                {data.lunch_menus.map((menu, index) => (
                    <div key={index} className="menu-item">
                        <h3 className="menu-name">{menu.name}</h3>
                        <p className="menu-description">{menu.description || "No description available"}</p>
                        <p className="menu-price">{menu.price} SEK</p>
                        <p>
                            <strong>Available:</strong> {menu.availability.join(", ")}
                        </p>
                        <p>
                            <strong>Tags:</strong>{" "}
                            {menu.tags.length > 0 ? menu.tags.join(", ") : "None"}
                        </p>
                        <p>
                            <strong>Valid From:</strong> {new Date(menu.validFrom.$date).toLocaleDateString()}{" "}
                            <strong>To:</strong> {new Date(menu.validTo.$date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Results;
