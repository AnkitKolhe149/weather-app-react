import "./App.css";
import { useState } from "react";
import useWeather from "./hooks/userweather";
import WeatherCard from "./components/weather-card";

function App() {
  const [city, setCity] = useState("");
  const { loading, weather, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    fetchWeather(city.trim());
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="card">
        <input
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
