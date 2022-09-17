import { useEffect, useState } from "react";

const GameField = ({fieldInfo, showField}) => {

  const [field, setField] = useState({...fieldInfo})
  const onClick = () => {
    showField(fieldInfo.row, fieldInfo.col)
    const new_field = Object.assign({}, field, {hidden: false})
    setField(new_field)
  }

  return (
      <div onClick={onClick} className={`field ${fieldInfo.hidden ? 'hidden' : 'shown'} ${fieldInfo.content}`} id={`${fieldInfo.row}-${fieldInfo.col}`}>{fieldInfo.content === 'bomb' ?
        'x' : fieldInfo.content
    }</div>
  )
}

export default GameField;
