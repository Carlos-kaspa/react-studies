

export function Profile(pokemonData:any) {
 
    let pokemon = pokemonData.pokemonData

    return (
        <div className='profile-container'>
            <img src={pokemon.sprites.front_default} alt="pokemon picture"/>
            <strong className='pokename'>{pokemon.name.toUpperCase()}</strong>
            
            <div className='pokeInfo'>
                <p> Get {pokemon.base_experience}xp to reach next level! </p>
            </div>
        </div>
    )
}