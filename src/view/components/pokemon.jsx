export function Pokemon(props) {
  return (
    <div>
      <div className="inside-container">
        <h1>Pokemón</h1>
        <div className="description">
          <p> {props.pokemonType === "" ? "Tipo" : props.pokemonType}</p>
          <p>{props.pokemonName === "" ? "Nome" : props.pokemonName}</p>
        </div>
      </div>
    </div>
  );
}
