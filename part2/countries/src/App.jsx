import { useEffect, useState } from "react"
import axios from 'axios'
import Weather from "./components/Weather"
import CountryDetails from "./components/CountryDetails"

export default function App() {
	const API_KEY = process.env.REACT_APP_API_KEY
	const [searchTerm, setSearchTerm] = useState("")
	const [allCountries, setAllCountries] = useState([])
	const [weatherData, setWeatherData] = useState(null)

	useEffect(() => {
		axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				setAllCountries(response.data)
			})
	}, [])

	const suggestions = allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
	useEffect(() => {
		if (suggestions.length === 1) {
			axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${suggestions[0].capital[0]}&appid=${API_KEY}&units=metric`)
				.then((response) => {
					setWeatherData(response.data)
				})
		}
	}, [searchTerm])

	function handleShow(country) {
		setSearchTerm(country)
	}

	return (
		<>
			<div>
				find countries<input type="text" value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)} />
				{
					suggestions.length > 10 &&
					<div>Too many matches, specify another filter</div>
				}
				{
					suggestions.length <= 10 && suggestions.length !== 1 &&
					suggestions.map(country => (
						<div key={country.area}>
							{country.name.common} 
							<button onClick={()=>handleShow(country.name.common)}>show</button>
						</div>
					))
				}
				{
					suggestions.length === 1
					&&
					<div>
						<CountryDetails suggestions={suggestions}/>
						<h3>Weather in {suggestions[0].capital[0]}</h3>
						{
							weatherData &&
							<Weather weatherData={weatherData}/>
						}
					</div>
				}
			</div>
		</>
	)
}

