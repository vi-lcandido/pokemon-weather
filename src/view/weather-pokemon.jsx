import { useState } from "react";
import { searchPokemonFromCity } from "../services/respository";
import { Pokemon } from "./components/pokemon";
import { Weather } from "./components/weather";
import { ErrorComponent } from "./components/error-component";
import { Input } from "./components/input";

export function WeatherPokemon() {
  //setando estados para alteração das informações de requisição ou utulizição dos componentes
  const [error, setError] = useState("");
  const [dataWeather, setDataWeather] = useState({});
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [temp, setTemp] = useState("");

  const handleSearchSubmit = async (event) => {
    // requisicao da API Open Weather ao pressionar o enter
    if (event.key === "Enter") {
      let { dataClima, temp, responsePokemonType, responsePokemonName, error } =
        await searchPokemonFromCity(event.target.value);
        //não dando erro na requisição da weather usa as funcoes de set do useState para passar os atributos do respository
      if (error === "") {
        setTemp(temp);
        setDataWeather(dataClima);
        setPokemonType(responsePokemonType);
        setPokemonName(responsePokemonName);
        setError(error);
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
