import GameField from "./GameField";

const GameLine = ({row}) => {
  return (
    <div className="line">
      {row.map(field => <GameField fieldInfo={field} key={`${field.row}-${field.col}`}/>)}
    </div>
  )
}

export default GameLine;
