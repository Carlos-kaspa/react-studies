import { isThrowStatement } from "typescript"

export default function ExperienceBar(exp:any){
    const level = {
        one: 400,
        two: 4000    ,
        three: 40000,
    }
    const handleLevels = (expCounter:any) => {
        if(expCounter < 400){
            return level.one
        } else if(expCounter > 400 && expCounter < 4000){
            return level.two
        } else {
            return level.three
        }
    }

    const xpLimit = (xp:number,limit:number) => {
        return xp/limit * 100
    }
   
    const levelWarning = (handleLevels:number) => {
        if(handleLevels === 400 ){
            return ''
        } else if(handleLevels === 4000){
            return 'Congratulations, you are now level 2!'
        } else if(handleLevels === 40000) {
            return 'You wont keep up with this, you need 40k xp to get to level 4! ... congrats on the level 3, tho... '
        }
    } 

    let expCounter = exp.exp
    let range:number = handleLevels(expCounter)
    return (
        <>
        <header className='experience-bar'>
            
            <span> {expCounter} xp </span>
                <div> <div style={{width: `${xpLimit(expCounter,range)}%`}}></div> </div>
                {console.log(xpLimit(expCounter,range))}
            <span >{handleLevels(expCounter)} xp </span>
     
            
        </header>

        <div className='message-container'>
            <p className='level-message'>{levelWarning(handleLevels(expCounter))}</p>
        </div>
        </>
    )
}