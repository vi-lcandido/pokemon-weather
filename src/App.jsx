import axios from "axios";
import { useState } from "react";
import { searchPokemonFromCity, searchPokemon } from "./services/respository";

function App() {
  const [dataWeather, setDataWeather] = useState({});
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [temp, setTemp] = useState("");

  const searchCity = async (event) => {
    if (event.key === "Enter") {
      let { dataClima, temp, tipoPokemon, nomePokemon } =
        await searchPokemonFromCity(event.target.value);
      setTemp(temp);
      setDataWeather(dataClima);
      setPokemonType(tipoPokemon);
      setPokemonName(nomePokemon);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div>
          <div className="search">
            <input
              placeholder="Digite uma cidade"
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
                    : `${temp} ºC`}
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
