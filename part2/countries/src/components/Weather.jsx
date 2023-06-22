
export default function Weather({weatherData}) {
    return (
        <>
            <p>temperature {weatherData.main.temp} Celcuis</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>wind {weatherData.wind.speed} m/s</p>
        </>
    )
}