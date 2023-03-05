import { key, urlWeather, urlPokemon } from "./config";
import axios from "axios";

export const searchPokemonFromCity = async (cityName) => {
  try {
    let response = await axios.get(urlWeather, {
      params: { q: cityName, appid: key },
    });
    
    if (response.data.cod === 200) {
      let resultWeather = response.data;

      let tempCelcius = celsiusTemp(resultWeather);

      if (resultWeather.weather[0].main === "Rain") {
        var { tipoPokemon, nomePokemon } = await searchPokemon("electric");
      } else if (tempCelcius < 5) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("ice");
      } else if (tempCelcius < 10) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("water");
      } else if (tempCelcius >= 12 && tempCelcius < 15) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("grass");
      } else if (tempCelcius >= 15 && tempCelcius < 21) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("ground");
      } else if (tempCelcius >= 23 && tempCelcius < 27) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("bug");
      } else if (tempCelcius >= 27 && tempCelcius <= 33) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("rock");
      } else if (tempCelcius > 33) {
        var { tipoPokemon, nomePokemon } = await searchPokemon("fire");
      } else {
        var { tipoPokemon, nomePokemon } = await searchPokemon("normal");
      }
      return {
        dataClima: resultWeather,
        temp: tempCelcius,
        tipoPokemon: tipoPokemon,
        nomePokemon: nomePokemon,
        error: "",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      dataClima: {},
      temp: "",
      tipoPokemon: "",
      nomePokemon: "",
      error: "Aconteceu um erro, tente novamente",
    };
  }
};

const celsiusTemp = (weather) => {
  let tempCelcius = Math.round(parseFloat(weather.main.temp) - 273.15);

  return tempCelcius;
};

export const searchPokemon = async (pokemonType) => {
  let response = await axios.get(`${urlPokemon}${pokemonType}`);
  let resultPokemon = response.data;

  const randomPokemon = Math.floor(
    Math.random() * (resultPokemon.pokemon.length - 1)
  );

  let resultPokemonList = resultPokemon.pokemon;

  if (
    localStorage.getItem("nome") ===
    resultPokemonList[randomPokemon].pokemon.name
  ) {
    if (randomPokemon == resultPokemonList.length - 1) {
      localStorage.setItem(
        "nome",
        resultPokemonList[randomPokemon - 1].pokemon.name
      );
    } else {
      localStorage.setItem(
        "nome",
        resultPokemonList[randomPokemon + 1].pokemon.name
      );
    }
  }

  return {
    tipoPokemon: pokemonType,
    nomePokemon: resultPokemonList[randomPokemon].pokemon.name,
  };
};
