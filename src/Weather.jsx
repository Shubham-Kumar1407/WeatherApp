import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Weather.css"; // Import CSS file

const Weather = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (searchQuery.trim() === "") return; // Prevent empty search
				const response = await axios.get(
					`http://api.weatherapi.com/v1/current.json?key=794f6f8821e146a6b1b193655242002&q=${searchQuery}`
				);
				setWeatherData(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};

		fetchData();
	}, [searchQuery]);

	const handleSearch = async (e) => {
		e.preventDefault();
		const trimmedQuery = searchQuery.trim();
		if (trimmedQuery) {
			setSearchQuery(trimmedQuery);
		}
	};

	return (
		<div className='weather-container'>
			<h1>City's Weather</h1>
			<form className='search-form' onSubmit={handleSearch}>
				<input
					type='text'
					className='search-input'
					placeholder='Search by city...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button type='submit' className='search-button'>
					Search
				</button>
			</form>
			{weatherData && weatherData.location && (
				<div className='weather-info'>
					<h2>
						{weatherData.location.name}, {weatherData.location.region},{" "}
						{weatherData.location.country}
					</h2>
					<p>
						Current Temperature: {weatherData.current.temp_c}°C /{" "}
						{weatherData.current.temp_f}°F
					</p>
					<p>Condition: {weatherData.current.condition.text}</p>
					<p>
						Wind: {weatherData.current.wind_kph} kph, {weatherData.current.wind_dir}
					</p>
					<p>Pressure: {weatherData.current.pressure_mb} mb</p>
					<p>Humidity: {weatherData.current.humidity}%</p>
				</div>
			)}
		</div>
	);
};

export default Weather;
