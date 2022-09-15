const GameField = ({fieldInfo}) => {
  return (
      <div className={`field hidden ${fieldInfo.content}`} id={`${fieldInfo.row}-${fieldInfo.col}`}>{fieldInfo.content === 'bomb' ?
        'x' : fieldInfo.content
    }</div>
  )
}

export default GameField;
