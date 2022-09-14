import DropdownElement from './DropdownElement'

const Options = ({onChange}) => {
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
        <span className='time'></span>
        <span className='emoji'></span>
        <span className='bombs-left'></span>
      </div>
    </div>
  )
}

export default Options;
