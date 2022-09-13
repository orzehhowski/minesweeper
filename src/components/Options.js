import DropdownElement from './DropdownElement'

const Options = ({onChange}) => {
  return (
    <div className="Options">
      <ul className="Difficulty">
        <DropdownElement elementName="easy" dropdownName="difficulty" onChange={onChange}/>
        <DropdownElement elementName="medium" dropdownName="difficulty" onChange={onChange}/>
        <DropdownElement elementName="expert" dropdownName="difficulty" onChange={onChange}/>
      </ul>
      <ul className="Color">
        <DropdownElement elementName="light" dropdownName="color" onChange={onChange}/>
        <DropdownElement elementName="dark" dropdownName="color" onChange={onChange}/>
      </ul>
    </div>
  )
}

export default Options;
