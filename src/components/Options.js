import DropdownElement from './DropdownElement'

const Options = ({onChange, difficulty, bombsNoticed, restartGame, isGameLost,isGameWon}) => {
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
        <span className={`time counter ${difficulty === 'easy' && 'easy'}`}>{difficulty !== 'easy' && 0}00</span>
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
