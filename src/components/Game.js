import GameLine from "./GameLine"

const Game = ({difficulty}) => {
  let width, height, bombs
  switch (difficulty) {
    case 'easy':
      width = 8
      height = 8
      bombs = 10
      break;
    case 'medium':
      width = 16
      height = 16
      bombs = 40
      break;
    case 'expert':
      width = 31
      height = 16
      bombs = 99
      break;
    default:
      break;
  }
  const h = []
  for (let i = 0; i < height; i++) {
    h.push(i)
  }
  return (
    <div className="Game">
      {h.map(el => <GameLine width={width} num={el}/>)}
    </div>
  )
}

export default Game;
