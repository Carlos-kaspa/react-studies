
import ExperienceBar from "../components/ExperienceBar"
import { useState } from "react"
import { Profile } from "../components/Profile"

export default function Home() {
  
  const randomNumber = (counter:any) => {
    return counter +Math.floor(Math.random() * (25 - 4 + 1) * 4)
  }

  const [ expCounter, setExpCounter ] = useState(0)

 
  return (
    <div className='container'>
      <ExperienceBar
        exp={expCounter}
      />
      <div className='message'>
        <h1> LEVEL YOURSELF UP!</h1>
        <p>You've gained {expCounter} xp! </p>
      </div>
      <section>

        <div className='profile-section'>
          <Profile/>
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
