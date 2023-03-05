export function Weather(props) {
  return (
    <div>
      <div className="search">
        <input
          placeholder="Digite uma cidade"
          onKeyDown={props.handleSearchSubmit}
          type="text"
        ></input>
      </div>
      <div className="inside-container">
        <h1>Clima</h1>
        <h3>{props.name}</h3>
        <div className="description">
          <p>{props.weather}</p>
        </div>
        <div className="temp">
          <div>
            <p>{props.temp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
