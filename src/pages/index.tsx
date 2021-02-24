
import { ExperienceBar } from "../components/ExperienceBar"
import { useState, useEffect } from "react"
import { Profile } from "../components/Profile"
import axios from 'axios'

export default function Home() {

  const [ refresh, setRefresh ] = useState(0)
  const [ expCounter, setExpCounter ] = useState(0)

  const [ pokemon, setPokemon ] = useState({
          name:'' ,
          sprites: {front_shiny:''},
          id: '',
          base_experience: ''
      })

  useEffect(() => {
    let randomPokemon = Math.floor(Math.random() * (100 - 1)+1)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
        .then(response => setPokemon(response.data));
  }, [refresh]);

const randomNumber = (counter:any) => {
  return counter +Math.floor(Math.random() * (15 - 4 + 1) * 4)
}

const handleLevel = (currentXP,totalExp, refresh) =>{
  if(currentXP >= totalExp && currentXP != 0){
    setExpCounter(0)
    setRefresh(refresh => refresh+1)
    return; 
  }
}

  return (
    <div className='container'>
     
      <ExperienceBar
         pokemonData={pokemon}
         exp={expCounter}
         onChange={handleLevel(expCounter,pokemon.base_experience,refresh)}
      /> 
      

      <div className='message'>
        <h1> LEVEL YOURSELF UP!</h1>
        <p>You've gained {expCounter} xp! </p>
      </div>
      <section>

        <div className='profile-section'>
          <Profile
            pokemonData={pokemon}
          />
        </div>

        <div className='button-section'>

          <button className='exp-button' 
          
            onClick={() => setExpCounter(randomNumber(expCounter))} 
            style={{height: '5rem'}} > 
              Click for XP 
          </button>

        </div>
      </section>
    </div>
  );
}
