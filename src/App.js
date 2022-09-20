import Options from './components/Options';
import Game from './components/Game';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [color, setColor] = useState('light')
  const [bombsNoticed, setBombsNoticed] = useState(0)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [newGame, setNewGame] = useState(0)
  const changeSettingsHandler = (setting, val) => {
    if (setting === 'color') {
      setColor(val)
    }
    else {
      setDifficulty(val)
      setIsGameRunning(false)
      setBombsNoticed(0)
    }
  }

  const restartGame = () => {
    if (isGameRunning || isGameLost || isGameWon) {
      setNewGame(x => x + 1)
      setIsGameLost(false)
      setIsGameRunning(false)
      setIsGameWon(false)
      setBombsNoticed(0)
    }
  }

  const winGame = () => {
    setIsGameWon(true)
  }

  return (
    <div className={`App ${color}`}>
      <h1 className={color} >The minesweeper game</h1>
      <div className="wrapper">
        <Options bombsNoticed={bombsNoticed} 
        onChange={changeSettingsHandler} 
        difficulty={difficulty}
        restartGame={restartGame}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        />
        <Game difficulty={difficulty} 
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        newGame={newGame}
        bombsNoticed={bombsNoticed} 
        isGameLost={isGameLost}
        setIsGameLost={setIsGameLost}
        isGameWon={isGameWon}
        setIsGameWon={setIsGameWon}
        setBombsNoticed={setBombsNoticed}
        />
      </div>
    </div>
  );
}

export default App;
