import { useState } from "react";

function useWeather() {
    const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
    if (!API_KEY) console.warn("VITE_WEATHERAPI_KEY is not set in .env");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);

    const fetchWeather = async (city) => {
        if (!city) {
            setError("Please enter a city name");
            setWeather(null);
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            // Request forecast for today (hourly) and include AQI
            const res = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1&aqi=yes&alerts=no`
                );
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error?.message || `HTTP ${res.status}`);
            }
            const data = await res.json();
            // the response contains 'location', 'current', and 'forecast'
            setWeather(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, weather, error, fetchWeather };
}

export default useWeather;