import axios from "axios";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import './App.css'

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState({});
  
  const key = "bbf164b1840641ac124799d6d35c5289"
  const baseUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios.get(baseUrlWeather).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* <div> */}
        <div className="header">
          <input 
          placeholder="Digite uma cidade"
          value={cityName}
          onChange={event => setCityName(event.target.value)}
          onKeyDown={searchCity}
          type="text"
          ></input>
        </div>
        <div className="inside-container">
          <h1>Clima</h1>
          <h3>Manaus</h3>
          <div className="description">
            <p>Chuva</p>
          </div>
          <div className="temp">
            <p>50ºC</p>
          </div>
        </div>
        {/* </div> */}
        <div>
          <div className="inside-container">
            <h1>Pokemón</h1>
            <div className="description">
              <p>Tipo do pokemon</p>
              <p>Nome pokemon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
