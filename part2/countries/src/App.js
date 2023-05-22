import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchQuery}`
        );

        if (response.data.length > 10) {
          setSearchResults([]);
          setErrorMessage(
            "Too many matches. Please make your query more specific."
          );
        } else {
          setSearchResults(response.data);
          setErrorMessage("");
        }
      } catch (error) {
        setSearchResults([]);
        setErrorMessage(
          "Error occurred while fetching data. Please try again later."
        );
      }
    };
    if (searchQuery.trim() !== "") {
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a country..."
        />
        <button type="submit">Search</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      {searchResults.length === 1 && (
        <div>
          {searchResults.map((country) => (
            <Country key={country.name.common} country={searchResults[0]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
