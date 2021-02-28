
import { ExperienceBar } from "../components/ExperienceBar"
import React,{ useState, useEffect } from "react"
import { Profile } from "../components/Profile"
import axios from 'axios'

export default function Home() {
  let randomPokemon = 1
  const [ refresh, setRefresh ] = useState(false)
  const [ expCounter, setExpCounter ] = useState(0)
  const [ overallXp, setOverallXp ] = useState(0)
  const [ isEvolved , setIsEvolved ] = useState(false)
  const [ evolutionCounter , setEvolutionCounter ] = useState(0)
  const [ newPokemon , setNewPokemon ] = React.useState<string>()

  const [ pokemon, setPokemon ] = React.useState({
          name:'null' ,
          sprites: {front_shiny: 'null'},
          id: 'null',
          base_experience: null
      })
      
  const [ pokeEvolution, setPokeEvolution ] = React.useState<string>()

useEffect(() => {
  Notification.requestPermission()
  axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then(response => setPokemon(response.data));
   
}, [])

React.useEffect(() => {
  if(isEvolved){

   /*  axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemon.id + 1}`)
    .then(response => {
      console.log('-------------- ', response.data) */
      setNewPokemon(pokemon.id + 1)
   /*  }); */
    setIsEvolved(false)
    
  }
}, [isEvolved]);


useEffect(()=>{

  if(newPokemon){

    axios.get(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`)
      .then(response => setPokemon(response.data));

      if(Notification.permission === 'granted'){
        new Notification('Novo nível!', {
          body: 'Parabéns, você subiu de nível!'
        })
      }
      
      
  }

},[newPokemon])

useEffect(()=>{
   let newXpValue = overallXp
  newXpValue += expCounter 
  setOverallXp(newXpValue)
},[expCounter])

const randomNumber = (counter:any) => {
  return counter +Math.floor(Math.random() * (15 - 4 + 1) * 4)
}

const handleLevel = (currentXP,totalExp, refresh) =>{
  if(currentXP >= totalExp && currentXP != 0){
    setExpCounter(0)
    setEvolutionCounter(evolutionCounter+1)
    setIsEvolved(true)
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
        <h1> GAIN XP, GET NEW POKEMON!</h1>
        <p>You've gained {overallXp} total exp </p>
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
              Click for Exp
          </button>

        </div>
      </section>
    </div>
  );
}
