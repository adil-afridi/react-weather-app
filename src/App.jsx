import { useState } from 'react';
import './App.css'
import axios from 'axios';


function App() {

  const [city , setCity] = useState('')
  const [weather , setWeather] = useState(null)
  const [error , setError] = useState(null)

 const  apiKey = '355c6ce70121ce626de51eb290231b20'

  const getWeather = async(city)=>{
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

      setWeather(response.data)
      console.log(response.data)
      setError(null)

    } catch (error) {
      setError('city not found')
      setWeather(null)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    getWeather(city)
  }
  return (
    <>
        <div className='container'>
          <h1 style={{marginTop:'0px'}}>Weather App</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={city}
              placeholder='write city name..'
              onChange={(e) =>setCity(e.target.value)}
            />
            <button type="submit">Get Weather</button>
          </form>
         {error && <p style={{color:'red'}}>{error}</p>}
        { weather && <div>
          <h3>{weather.name}</h3>
          <h4>{Math.floor(weather.main.temp - 273.15)} °C</h4>
          <img src={`https:/openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
         </div>}
        </div> 
    </>
  );
}


export default App;

