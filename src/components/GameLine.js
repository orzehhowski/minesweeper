import GameField from "./GameField";

const GameLine = ({width}) => {
  const line = []
  for (let i = 0; i < width; i++) {
    line.push(i)
  }

  return (
    <div>
      {line.map(el => <GameField num={el}/>)}
    </div>
  )
}

export default GameLine;
