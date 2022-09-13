const DropdownElement = ({elementName, dropdownName, onChange}) => {
  const onClick = () => {
    onChange(dropdownName, elementName)
  }

  return (
    <li onClick={onClick}>
      <input type="radio" id={elementName} name={dropdownName} value={elementName} />
      <label for={elementName}>{elementName}</label>
    </li>
  )
}

export default DropdownElement;
