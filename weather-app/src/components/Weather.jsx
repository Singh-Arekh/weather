import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    1003: cloud_icon,
    1000: clear_icon,
    1030: cloud_icon,
    1009: cloud_icon,
    1063: drizzle_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter valid city");
      return;
    }
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=7b7b9c2ee25640aea9f91106250602`;
      const response = await fetch(`${url}&q=${city}&aqi=yes`);
      const data = await response.json();
      if (!response.ok) {
        alert("invalid");
        return;
      }
      console.log(data);
      const icon =
        allIcons[data.current.condition.code] || data.current.condition.icon;
      console.log("All icon", icon);
      const res = setWeatherData({
        humidity: data.current.humidity,
        windspeed: data?.current.wind_kph,
        temprature: Math.floor(data?.current?.temp_c),
        location: data.location.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error(error);
    }
  };
  useEffect(() => {
    search("alaska");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temprature">{weatherData.temprature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <div>
                <span>Humidity</span>
                <p>{weatherData.humidity}%</p>
              </div>
            </div>
            <div className="col">
              <div>
                <span>Wind</span>
                <p>{weatherData.windspeed} km/h</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
