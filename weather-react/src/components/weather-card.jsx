
export default function WeatherCard({ weather }) {
	if (!weather) return null;

	const loc = weather.location || {};
	const cur = weather.current || {};

	const icon = cur.condition?.icon
		? cur.condition.icon.startsWith("//")
			? `https:${cur.condition.icon}`
			: cur.condition.icon
		: null;

	return (
		<div className="weather">
			<h2>
				{loc.name}{loc.region ? `, ${loc.region}` : ""} {loc.country}
			</h2>
			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				{icon && (
					<img src={icon} alt={cur.condition?.text} width={48} height={48} />
				)}
				<div>
					<p>Temperature: {cur.temp_c ?? "N/A"} °C</p>
					<p>Weather: {cur.condition?.text ?? ""}</p>
					<p>Humidity: {cur.humidity ?? ""}%</p>
				</div>
			</div>
		</div>
	);
}
