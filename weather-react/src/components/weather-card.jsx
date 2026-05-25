import React from "react";

function Sparkline({ points = [] }) {
  if (!points.length) return null;
  const w = 200;
  const h = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const loc = weather.location || {};
  const cur = weather.current || {};
  const forecastDay = weather.forecast?.forecastday?.[0];
  const hours = forecastDay?.hour || [];

  const temps = hours.slice(0, 12).map((h) => h.temp_c ?? null).filter((v) => v !== null);

  const icon = cur.condition?.icon
    ? cur.condition.icon.startsWith("//")
      ? `https:${cur.condition.icon}`
      : cur.condition.icon
    : null;

  const aqi = weather.current?.air_quality || null;

  const condition = (cur.condition?.text || "").toLowerCase();
  const cls = `weather-card ${condition.includes("rain") ? "rainy" : condition.includes("cloud") ? "cloudy" : condition.includes("sun") || condition.includes("clear") ? "sunny" : "neutral"}`;

  return (
    <div className={cls}>
      <div className="weather-header">
        <div>
          <h2>
            {loc.name}
            {loc.region ? `, ${loc.region}` : ""} {loc.country}
          </h2>
          <p className="muted">{cur.condition?.text}</p>
        </div>
        <div className="icon-badge">
          {icon && <img src={icon} alt={cur.condition?.text} width={64} height={64} />}
          <div className="temp-large">{cur.temp_c ?? "N/A"}°</div>
        </div>
      </div>

      <div className="weather-body">
        <div className="left">
          <p>Humidity: {cur.humidity ?? "—"}%</p>
          <p>Wind: {cur.wind_kph ?? "—"} kph</p>
          {aqi && aqi["pm2_5"] && <div className="aqi-chip">AQI: {Math.round(aqi["pm2_5"])}</div>}
        </div>
        <div className="right">
          <Sparkline points={temps} />
        </div>
      </div>
    </div>
  );
}
