import { useEffect, useState } from "react";

const GameField = ({fieldInfo}) => {

  return (
      <div className={`field ${fieldInfo.hidden ? 'hidden' : 'shown'} ${fieldInfo.content}`} id={`${fieldInfo.row}-${fieldInfo.col}`}>{fieldInfo.content === 'bomb' ?
        'x' : fieldInfo.content
    }</div>
  )
}

export default GameField;
