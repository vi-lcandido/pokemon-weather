export function Input(props) {
    return(
        <div className="search">
        <input
          placeholder="Digite uma cidade"
          onKeyDown={props.handleSearchSubmit}
          type="text"
        ></input>
      </div>
    )
}