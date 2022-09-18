import GameField from "./GameField";

const GameLine = ({row, showField}) => {
  return (
      <div className="line">
        {row.map(field => <GameField 
        showField={showField} fieldInfo={field}
        key={`${field.row}-${field.col}`}/>)}
      </div>
  )
}

export default GameLine;
