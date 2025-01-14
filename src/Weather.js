import React, { useState } from 'react'
import CurrentLocation from './CurrentLocation';
import axios from 'axios';

const Weather = () => {

    const [InputCity, setInputCity] = useState('pune');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const inputval = e.target.value;
        setInputCity(inputval);
    }
    const fetchWether = async () => {
        try {

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${InputCity}&appid=${'8742b32a5fbb68977297f9b329513461'}`)

            console.log(response);
            setWeather(response.data);
            setInputCity('');

        } catch (error) {
            console.log("Error to fetching data", error);

        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = () => {
        fetchWether();
    }

    return (
        <div>
            <div className='weather-layout'>

                <div className="weather-container">


                    {weather.main ? (
                        <div>
                            <h1>{weather.name},{weather.sys.country}</h1>
                            <p></p>
                            <p>{<CurrentLocation />}</p>
                            <h1>{Math.round(weather.main.temp - 273.15)}°C</h1>
                        </div>
                    ) : (
                        <div>
                            console.log("Error");
                        </div>

                    )

                    }
                </div>
                {weather.main ? (
                    <div className='weather-container2'>
                        <ul>
                            <input placeholder='Enter city' value={InputCity} type='text' onChange={handleChange} />
                            <button className='btn' onClick={handleSubmit} disabled={loading}>{loading ? "Loading.." : "Get weather"}</button>
                            <h2>{weather.name}</h2>
                            <p>Tempture : {Math.round(weather.main.temp - 273.15)}°C</p>
                            <p>Humidity {weather.humidity}%</p>
                            <p>Visibility {weather.visibility} mi</p>
                            <p>Wind Speed {weather.wind.speed}km/h</p>
                        </ul>
                        <div>

                        </div>
                    </div>


                ) : (
                    <div>
                        {Object.keys(weather).length === 0 ? (
                            <p>Enter the vaild city to check and press "Get weather" to fetch data.</p>
                        ) : (
                            <p>Unable to check data please try again..</p>
                        )}
                    </div>
                )}

            </div>

        </div>



    )
}

export default Weather