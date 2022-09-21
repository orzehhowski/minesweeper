import { useEffect, useState } from 'react'
import DropdownElement from './DropdownElement'

const Options = ({onChange, difficulty, bombsNoticed, restartGame, isGameRunning, isGameLost,isGameWon}) => {
  const bombs = difficulty === 'easy' ? 10 - bombsNoticed : (difficulty === 'medium' ? 40 - bombsNoticed : 99 - bombsNoticed)
  let bombsLeftContent
  if (difficulty === 'easy') {
    if (bombs < 10) {
      bombsLeftContent = `0${bombs}`
    } else {
      bombsLeftContent = bombs
    }
  } else {
    if (bombs < 10) {
      bombsLeftContent = `00${bombs}`
    } else {
      bombsLeftContent = `0${bombs}`
    }
  }

  const [seconds, setSeconds] = useState(0)
  const [timeString, setTimeString] = useState(difficulty === 'easy' ? '00' : '000')

  const changeTime = () => {
    setSeconds(sec => sec + 1)
      if (seconds < 10) {
        setTimeString(difficulty === 'easy' ? `0${seconds}` : `00${seconds}`)
      } else if (seconds < 100) {
        setTimeString(difficulty === 'easy' ? `${seconds}` : `0${seconds}`)
      } else if (seconds < 1000) {
        setTimeString(difficulty === 'easy' ? `99` : `${seconds}`)
      } else {
        setTimeString(difficulty === 'easy' ? `99` : `999`)
      }
  }

  useEffect(() => {
    if (! (isGameRunning || isGameLost || isGameWon)) {
      setSeconds(-1)
    } else if (! seconds) {
      setSeconds(1)
    }
    const timeoutID = setTimeout(changeTime, 1000)
    if (!isGameRunning) {
      clearTimeout(timeoutID)
      if (!(isGameLost || isGameWon)) {
        changeTime()
      }
    }

    return () => {
      clearTimeout(timeoutID)
    }
  }, [difficulty, isGameRunning, isGameLost, isGameWon, seconds])

  return (
    <div className="Options">
      <div className='menu'>
        <div className='popup-wrapper'>
          <span className='difficulty-tag'>Difficulty</span>
          <ul className="Difficulty">
            <DropdownElement elementName="easy" dropdownName="difficulty" onChange={onChange}/>
            <DropdownElement elementName="medium" dropdownName="difficulty" onChange={onChange}/>
            <DropdownElement elementName="expert" dropdownName="difficulty" onChange={onChange}/>
          </ul>
        </div>
        <div className='popup-wrapper'>
          <span className='color-tag' >Color</span>
          <ul className="Color">
            <DropdownElement elementName="light" dropdownName="color" onChange={onChange}/>
            <DropdownElement elementName="dark" dropdownName="color" onChange={onChange}/>
          </ul>
        </div>
      </div>
      <div className='panel'>
        <span className={`time counter ${difficulty === 'easy' && 'easy'}`}>{timeString}</span>
        <img className='emoji' onClick={restartGame} 
        src={isGameLost ? 
        require('../img/loseEmoji.png') 
        : isGameWon ? require('../img/winEmoji.png')
        : require('../img/startingEmoji.png')} alt=""></img>
        <span className={`bombs-left counter 
        ${difficulty === 'easy' && 'easy'}`}>
          {bombsLeftContent}
        </span>
      </div>
    </div>
  )
}

export default Options;
