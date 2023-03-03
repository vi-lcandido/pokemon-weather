import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const baseUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <input placeholder="Digite uma cidade"></input>
        </div>
        <div className="weather-container">
          <h1>Clima</h1>
          <h3>Manaus</h3>
          <div className="description">
            <p>Chuva</p>
          </div>
          <div className="temp">
            <p>50ºC</p>
          </div>
        </div>
        <div>
          <div className="pokemon-container">
            <div className="description">
              <h1>Pokemón</h1>
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
