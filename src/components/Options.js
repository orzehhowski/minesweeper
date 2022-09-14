import DropdownElement from './DropdownElement'

const Options = ({onChange, difficulty}) => {
  const bombs = difficulty === 'easy' ? 10 : (difficulty === 'medium' ? 40 : 99) 

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
        <img className='emoji' src={require('../img/startingEmoji.png')} ></img>
        <span className={`bombs-left counter ${difficulty === 'easy' && 'easy'}`}>{difficulty !== 'easy' && 0}{bombs}</span>
      </div>
    </div>
  )
}

export default Options;
