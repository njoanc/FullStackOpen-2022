import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Button from "./components/Button";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");

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

  useEffect(() => {
    const fetchWeather = async (capital) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setWeather(response.data.main.temp);
        setIcon(
          `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
        );
        setWind(response.data.wind.speed);
      } catch (error) {
        setWeather("");
      }
    };
    if (selectedCountry) {
      fetchWeather(selectedCountry.capital);
    }
  }, [selectedCountry]);

  const handleCountryButtonClick = (country) => {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  };

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
      {searchResults.length === 1 && <Country country={searchResults[0]} />}
      {searchResults.length > 1 && (
        <div>
          {searchResults.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <Button
                text="Show"
                handleShow={() => handleCountryButtonClick(country)}
              />
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <div>
          <Country country={selectedCountry} />
          {selectedCountry.capital && (
            <h3>Weather in {selectedCountry.capital}</h3>
          )}
          <p>temperature {weather} Farneit</p>
          <img alt="current weather" src={icon} />
          <p>wind {wind} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
