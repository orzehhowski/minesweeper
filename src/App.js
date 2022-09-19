import Options from './components/Options';
import Game from './components/Game';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [color, setColor] = useState('light')
  const [bombsNoticed, setBombsNoticed] = useState(0)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [newGame, setNewGame] = useState(0)
  const changeSettingsHandler = (setting, val) => {
    if (setting === 'color') {
      setColor(val)
    }
    else {setDifficulty(val)}
  }

  const onBombNoticed = (wasBombNoticed) => {
    if (wasBombNoticed) {
      setBombsNoticed(x => x + 1)
    } else {setBombsNoticed(x => x - 1)}
  }

  const restartGame = () => {
    if (isGameRunning) {
      setNewGame(x => x + 1)
      setIsGameRunning(false)
      setBombsNoticed(0)

    }

  }

  return (
    <div className={`App ${color}`}>
      <h1 className={color} >The minesweeper game</h1>
      <div className="wrapper">
        <Options bombsNoticed={bombsNoticed} 
        onChange={changeSettingsHandler} 
        difficulty={difficulty}
        restartGame={restartGame}
        />
        <Game difficulty={difficulty} 
        onBombNoticed={onBombNoticed}
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        newGame={newGame}
        bombsNoticed={bombsNoticed} 
        />
      </div>
    </div>
  );
}

export default App;
