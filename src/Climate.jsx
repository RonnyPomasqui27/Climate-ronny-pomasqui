import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Climate = () => {

  const [climate, setClimate] = useState({})
  const [isCelcius, setIsCelcius] = useState(true)
  // Para cambiar la temperatura farenheit a celcius
  let kelvin = climate.main?.temp_max;
  let faren = Math.floor(((kelvin - 273.15) * 1.8) + 32);
  let celcius = Math.floor((faren + 32) / 1.8);
  // Para cambiar la temperatura farenheit a celcius
  let kelvin2 = climate.main?.temp_min;
  let faren2 = Math.floor(((kelvin2 - 273.15) * 1.8) + 32);
  let celcius2 = Math.floor((faren2 + 32) / 1.8);
  // Para cambiar la temperatura farenheit a celcius
  let kelvin3 = climate.main?.feels_like;
  let faren3 = Math.floor(((kelvin3 - 273.15) * 1.8) + 32);
  let celcius3 = Math.floor((faren3 + 32) / 1.8);
  //iconos
  let iconUrl = climate.weather?.[0].icon;

  //timezone: -18000



  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f06ad45ebda64f08b293021632d7f2d`)
        .then(res => setClimate(res.data));
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  const changeTemperature = () => {
    setIsCelcius(!isCelcius)
  };

  console.log(climate)

  return (
    <>
      <div className='container'>
        <div className="container-climate">
          <div className="climate-icon" >
            <h3>{`${climate.sys?.country}, ${climate.name}`}</h3>
            <img src={`http://openweathermap.org/img/wn/${iconUrl}@2x.png`} alt="icon" style={{ width: '100px' }} />
            <p style={{ margin: '0px' }}>{climate.weather?.[0].description}</p>
            <div className="max_min">
              <p style={{ fontSize: '1rem' }}><i class="fa-solid fa-temperature-arrow-up" style={{ fontSize: '1rem', marginLeft: '13px' }}></i>{`${isCelcius ? faren3 : celcius3} ${isCelcius ? 'ºF' : 'ºC'}`}</p>
              <p style={{ fontSize: '0.8rem' }}><i class="fa-solid fa-temperature-arrow-up" style={{ fontSize: '0.8rem' }}></i>{`MAX: ${isCelcius ? faren : celcius} ${isCelcius ? 'ºF' : 'ºC'}`}</p>
              <p style={{ fontSize: '0.8rem' }}><i class="fa-solid fa-temperature-arrow-down" style={{ fontSize: '0.8rem' }}></i>{`MIN: ${isCelcius ? faren2 : celcius2} ${isCelcius ? 'ºF' : 'ºC'}`}</p>
            </div>
          </div>
          <div className="climate-info">
            <p ><i class="fa-solid fa-wind" ></i>{`SPEED: ${climate.wind?.speed} m/s`}</p>
            <p><i class="fa-solid fa-cloud" ></i>{`HUMIDITY: ${climate.main?.humidity} %`}</p>
            <p><i class="fa-solid fa-temperature-three-quarters"></i>{`PRESSURE: ${climate.main?.pressure} Pa`}</p>
          </div>
          <div className="change">
            <a href="#" onClick={changeTemperature}><i class="fa-solid fa-shuffle"></i></a>
          </div>
        </div>
      </div>
    </>
    // style={{color:'#DD5353'}}
    // style={{backgroundColor:'#DD5353'}}
  );
};

export default Climate;