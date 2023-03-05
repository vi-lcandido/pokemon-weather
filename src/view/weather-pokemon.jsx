import { useState } from "react";
import { searchPokemonFromCity } from "../services/respository";
import { Pokemon } from "./components/pokemon";
import { Weather } from "./components/weather";
import { ErrorComponent } from "./components/error-component";
import { Input } from "./components/input";

export function WeatherPokemon() {
  const [error, setError] = useState("");
  const [dataWeather, setDataWeather] = useState({});
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [temp, setTemp] = useState("");

  const handleSearchSubmit = async (event) => {
    if (event.key === "Enter") {
      let { dataClima, temp, tipoPokemon, nomePokemon, error } =
        await searchPokemonFromCity(event.target.value);
      if (error === "") {
        setTemp(temp);
        setDataWeather(dataClima);
        setPokemonType(tipoPokemon);
        setPokemonName(nomePokemon);
        setError(error)
      } else {
        setError(error);
      }
    }
  };

  return (
    <div className="container">
      <Input handleSearchSubmit={handleSearchSubmit} />
      {error === "" ? (
        <div className="weather-pokemon-container">
          <Weather
            handleSearchSubmit={handleSearchSubmit}
            name={
              JSON.stringify(dataWeather) === "{}" ? "Cidade" : dataWeather.name
            }
            weather={
              JSON.stringify(dataWeather) === "{}"
                ? "Tempo"
                : dataWeather.weather[0].main
            }
            temp={
              JSON.stringify(dataWeather) === "{}"
                ? "Temperatura"
                : `${temp} ºC`
            }
          />
          <Pokemon pokemonType={pokemonType} pokemonName={pokemonName} />
        </div>
      ) : (
        <ErrorComponent text={error} />
      )}
    </div>
  );
}
