import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherFetchData } from './weatherSlice';
import { getCityNames } from './weatherSlice';
import WindImg from '../../assets/wind.png'
import HumidityImg from '../../assets/humidity.png'
import SunriseImg from '../../assets/sunrise.png'
import SleepingImg from '../../assets/sleeping.png'
import LatitudeImg from '../../assets/location.png'
import LongitudeImg from '../../assets/longitude.png'
import './Weather.css'

const Weather = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const weatherData = useSelector(getCityNames);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  const handleClick = () => {
    if (city.trim() !== '') { 
      dispatch(WeatherFetchData(city)); 
      console.log(dispatch(WeatherFetchData(city)))
    }
  };

  const Livedate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', // Get the day as a number
    month: 'short', // Get the abbreviated month name
  }).format(currentDateTime);


  const LiveTime =  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', // Get the hour
    minute: 'numeric', // Get the minute
     // Get the second
    hour12: true, // Use 12-hour format
  }).format(currentDateTime);

  let formattedSunrise = "N/A"; // Default value if data is missing
let formattedSunset = "N/A";  // Default value if data is missing

if (weatherData && weatherData.sys) {
    const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
    const sunsetTime = new Date(weatherData.sys.sunset * 1000);

    formattedSunrise = sunriseTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    formattedSunset = sunsetTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
} else {
    console.error("Weather data or 'sys' property is not available.");
}




  
  return (
    <div className="weather-app" > 
       <div className='sub-weather-app'>
      <input 
        type="text"
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name"
      />
      
      <button className='title' onClick={handleClick}>Check</button> 
      <div className='date-time'>
      <div className='date'>{Livedate}</div>
      <div className="time">{LiveTime}</div>
      </div>
      
      {status === 'loading' && <div className="loading">Loading...</div>} 
      {status === 'failed' && <div className="error">Error loading weather data: {error}</div>} 
      
      {status === 'succeeded' && weatherData && (
        <div className="weather-info">
          <h1 className='temp'>{Math.floor(weatherData.main?.temp - 273.5)}°C</h1>
          <p className='cityName'>{weatherData.name}</p>
         
          <div className='Images'>
  <div className='wind-info'>
    <img src={WindImg} alt="Wind Icon" />
    <p className='wind'>Speed <br/>{weatherData.wind.speed}</p>
  </div>
  <div className='humidity-info'>
    <img src={HumidityImg} alt="Humidity Icon" />
    <p className='Humidity'>Humidity <br />{weatherData.main.humidity}</p>
  </div>
</div>



<div className='sun-images'>
  <div className='sunrise-info'>
    <img src={SunriseImg} alt="sunrise Icon" />
    <p className='sunrise'>Sunrise <br />{formattedSunrise}</p>
  </div>
  <div className='sunset-info'>
    <img src={SleepingImg} alt="sunset Icon" />
    <p className='sunset'>Sunset <br />{formattedSunset}</p>
  </div>
</div>


<div className='latlon-images'>
  <div className='lat-info'>
    <img src={LatitudeImg} alt="lat Icon" />
    <p className='lat'>Latitude <br />{weatherData.coord.lat}</p>
  </div>
  <div className='lon-info'>
    <img src={LongitudeImg} alt="lon Icon" />
    <p className='lon'>longitude <br />{weatherData.coord.lon}</p>
  </div>
</div>


 </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
