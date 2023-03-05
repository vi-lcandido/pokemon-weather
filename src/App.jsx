import axios from "axios";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import './App.css'

function App() {
  const [cityName, setCityName] = useState("");
  const [dataWeather, setDataWeather] = useState({});
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonName, setPokemonName] = useState("");

  const key = "bbf164b1840641ac124799d6d35c5289";
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

  const urlPokemon = "https://pokeapi.co/api/v2/type/";

  const searchCity = async (event) => {
    if (event.key === "Enter") {
      let response = await axios.get(urlWeather);
      let resultWeather = response.data;
      setDataWeather(resultWeather);
      // console.log(resultWeather);
      // console.log(dataWeather);
      let tempCelcius = celsiusTemp(resultWeather);
      console.log(tempCelcius);
      if (resultWeather.weather[0].main === "Rain") {
        console.log(await searchPokemon("electric"));
      } else if (tempCelcius < 5) {
        console.log(await searchPokemon("ice"));
      } else if (tempCelcius < 10) {
        console.log(await searchPokemon("water"));
      } else if (tempCelcius >= 12 && tempCelcius < 15) {
        console.log(await searchPokemon("grass"));
      } else if (tempCelcius >= 15 && tempCelcius < 21) {
        console.log(await searchPokemon("ground"));
      } else if (tempCelcius >= 23 && tempCelcius < 27) {
        console.log(await searchPokemon("bug"));
      } else if (tempCelcius >= 27 && tempCelcius <= 33) {
        console.log(await searchPokemon("rock"));
      } else if (tempCelcius > 33) {
        console.log(await searchPokemon("fire"));
      } else {
        console.log(await searchPokemon("normal"));
      }
    }
  };

  const searchPokemon = async (pokemonType) => {
    let response = await axios.get(`${urlPokemon}${pokemonType}`);
    let resultPokemon = response.data;

    const randomPokemon = Math.floor(
      Math.random() * resultPokemon.pokemon.length
    );
    setPokemonType(pokemonType);
    setPokemonName(resultPokemon.pokemon[randomPokemon].pokemon.name);

    return resultPokemon.pokemon[randomPokemon].pokemon.name;
  };
  //  setPokemonType(searchPokemon("fire"))
  const celsiusTemp = (weather) => {
    let tempCelcius = Math.round(parseFloat(weather.main.temp) - 273.15);

    return tempCelcius;
  };

  return (
    <div className="app">
      <div className="container">
        <div>
          <div className="search">
            <input
              placeholder="Digite uma cidade"
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
              onKeyDown={searchCity}
              type="text"
            ></input>
          </div>
          <div className="inside-container">
            <h1>Clima</h1>
            <h3>
              {JSON.stringify(dataWeather) === "{}"
                ? "Cidade"
                : dataWeather.name}
            </h3>
            <div className="description">
              <p>
                {JSON.stringify(dataWeather) === "{}"
                  ? "Tempo"
                  : dataWeather.weather[0].main}
              </p>
            </div>
            <div className="temp">
              <div>
                <p>
                  {JSON.stringify(dataWeather) === "{}"
                    ? "Temperatura"
                    : celsiusTemp(dataWeather)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="inside-container">
            <h1>Pokemón</h1>
            <div className="description">
              <p> {pokemonType === "" ? "Tipo" : pokemonType}</p>
              <p>{pokemonName === "" ? "Nome" : pokemonName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
