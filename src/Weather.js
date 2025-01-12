import React, { useState } from 'react'
import CurrentLocation from './CurrentLocation';

const Weather = () => {

    const [InputCity, setInputCity] = useState('');
    const [weather, setWeather] = useState({});
    const handleChange = (e) => {
        const inputval = e.target.value;
        setInputCity(inputval);
    }
    const fetchWether = async () => {
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${InputCity}&appid=${'8742b32a5fbb68977297f9b329513461'}`)
            const result = await response.json();
            console.log(result);
            setWeather(result);
            setInputCity('');

        } catch (error) {
            console.log(error);

        }
    }
    const handleSubmit = () => {
        fetchWether();
    }
    return (
        <div>
            <input placeholder='Enter city' value={InputCity} type='text' onChange={handleChange} />
            <button className='btn' onClick={handleSubmit}>Get Weather</button>
            {weather.main?(
                <div className='weather-layout'>

                <div className="weather-container">
                    <h1>{weather.name},{weather.sys.country}</h1>
                    <p></p>
                    <p>{<CurrentLocation />}</p>
                    <h1>{Math.round(weather.main.temp - 273.15)}°C</h1>
                </div>
                <div className='weather-container2'>
                    <input placeholder='Enter city' value={InputCity} type='text' onChange={handleChange} />
                    <button className='btn' onClick={handleSubmit}>Get Weather</button>
                    <h2>{weather.name}</h2>
                    <p>Tempture : {Math.round(weather.main.temp - 273.15)}°C</p>
                    <p>Humidity {weather.humidity}%</p>
                    <p>Visibility {weather.visibility} mi</p>
                    <p>Wind Speed {weather.wind.speed}km/h</p>
                </div>
            </div>

             ):(
                <div>
                    {Object.keys(weather).length===0?(
                        <p>Enter the vaild city to check and press "Get weather" to fetch data.</p>
                    ):(
                        <p>Unable to check data please try again..</p>
                    )}
                </div>
             )} 
        </div>
   
  )
}

export default Weather