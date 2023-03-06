import { key, urlWeather, urlPokemon } from "./config";
import axios from "axios";

export const searchPokemonFromCity = async (cityName) => {
  try {
    //requisição assíncrona da API weather passando o nome da cidade e key por parâmetro
    let response = await axios.get(urlWeather, {
      params: { q: cityName, appid: key },
    });

    let resultWeather = response.data;

    let tempCelcius = celsiusTemp(resultWeather);
    //pega a funcao que procura os pokemons pela condicoes passa como parametro o clima e a temperatura, com isso me retorna o tipo de pokmeon e nome
    let { responsePokemonType, responsePokemonName } =
      await getPokemonFromWeather(resultWeather.weather[0].main, tempCelcius);

    //crio um objeto com os atributos do que eu preciso apresentar na tela
    return {
      dataClima: resultWeather,
      temp: tempCelcius,
      responsePokemonType:
        responsePokemonType.charAt(0).toUpperCase() +
        responsePokemonType.substring(1),
      responsePokemonName:
        responsePokemonName.charAt(0).toUpperCase() +
        responsePokemonName.substring(1),
      error: "",
    };
  } catch (error) {
    //dando erro todos os atibutos são vazios, menos o erro
    return {
      dataClima: {},
      temp: "",
      responsePokemonType: "",
      responsePokemonName: "",
      error: "Aconteceu um erro, tente novamente",
    };
  }
};

//transforma a temp para ºC
const celsiusTemp = (weather) => {
  let tempCelcius = Math.round(parseFloat(weather.main.temp) - 273.15);

  return tempCelcius;
};


export const searchPokemon = async (pokemonType) => {
  //requisicao da api do pokemon
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
    responsePokemonType: pokemonType,
    responsePokemonName: resultPokemonList[randomPokemon].pokemon.name,
  };
};

const getPokemonFromWeather = (weather, tempCelcius) => {
  if (weather === "Rain") {
    return searchPokemon("electric");
  } else if (tempCelcius < 5) {
    return searchPokemon("ice");
  } else if (tempCelcius < 10) {
    return searchPokemon("water");
  } else if (tempCelcius >= 12 && tempCelcius < 15) {
    return searchPokemon("grass");
  } else if (tempCelcius >= 15 && tempCelcius < 21) {
    return searchPokemon("ground");
  } else if (tempCelcius >= 23 && tempCelcius < 27) {
    return searchPokemon("bug");
  } else if (tempCelcius >= 27 && tempCelcius <= 33) {
    return searchPokemon("rock");
  } else if (tempCelcius > 33) {
    return searchPokemon("fire");
  } else {
    return searchPokemon("normal");
  }
};
