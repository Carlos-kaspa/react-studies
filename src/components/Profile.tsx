

export function Profile(pokemonData:any) {
 
    let pokemon = pokemonData.pokemonData

    return (
        <div className='profile-container'>
            <img src={pokemon.sprites.front_shiny} alt="pokemon picture"/>
            <div>
                <strong>{pokemon.name.toUpperCase()}</strong>
                <p>{pokemon.base_experience} xp </p>
            </div>
        </div>
    )
}