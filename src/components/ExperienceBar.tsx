
export function ExperienceBar({...props}){
 
    let pokemon = props.pokemonData

    const xpLimit = (xp:number,limit:number) => {
        return xp/limit * 100
    }

    const handleMessages = (xp,totalxp) => {
        if(xp >= totalxp && xp != 0){
            return `Congratulations, you are a ${pokemon.name.charAt(0).toUpperCase().slice(-1)} now.`
        }
    }

    return (
        <>
        <header className='experience-bar'>
            
            <span> {props.exp} </span>
                <div> <div style={{width: `${xpLimit(props.exp,pokemon.base_experience)}%`}}></div> </div>
            <span >{pokemon.base_experience} xp </span>
     
            
        </header>

        <div className='message-container'>
            <p className='level-message'>{handleMessages(props.exp,pokemon.base_experience)}</p>
        </div>
        </>
    )
}