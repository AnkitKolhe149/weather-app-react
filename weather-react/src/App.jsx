import "./App.css";
import { useState, useEffect } from "react";
import useWeather from "./hooks/userweather";
import WeatherCard from "./components/weather-card";

function App() {
  const [city, setCity] = useState("");
  const { loading, weather, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    fetchWeather(city.trim());
  };

  // favorites in localStorage
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites')||'[]') } catch { return [] }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (!city) return;
    setFavorites((s) => Array.from(new Set([city.trim(), ...s])));
  };

  const selectFavorite = (c) => {
    setCity(c);
    fetchWeather(c);
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
        <button onClick={addFavorite} style={{marginLeft:8}}>☆</button>
      </div>

      {favorites.length>0 && (
        <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
          {favorites.map(f=> (
            <button key={f} onClick={()=>selectFavorite(f)} style={{padding:'6px 10px',borderRadius:8}}>{f}</button>
          ))}
        </div>
      )}

      {/* animated clouds background */}
      <div className="clouds" aria-hidden>
        <img className="cloud" src="/cloud.svg" alt="" />
        <img className="cloud small right" src="/cloud.svg" alt="" />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
