
import { ExperienceBar } from "../components/ExperienceBar"
import React,{ useState, useEffect } from "react"
import { Profile } from "../components/Profile"
import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/client'


export default function Home() {
  
  let initialPokemon = 1 // need to design a better start point
  const [ session, loading ] = useSession()
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
  axios.get(`https://pokeapi.co/api/v2/pokemon/${initialPokemon}`)
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

console.log('session state', session)
  return (
    <main>
      {!session && (
        <section className='noSessionHome'>
          <div className='notSigned'>
            <h1>Login with Github</h1>
            <button className='signInButton' onClick={ signIn }> Log In </button>
          </div>
        </section>
      )}
      {session && (
        <>
          <section className='loggedInBar'>
            <div className='userInfo'>
              <h1>{session.user.name}</h1>
              <img className='userAvatar' src={session.user.image} alt="user image"/>
            </div>
            <button className='signOutButton'onClick={ signOut }> Log Out </button>
          </section>

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
        </>
          
      )}
      
    </main>
  );
}
