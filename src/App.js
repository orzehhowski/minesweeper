import Options from './components/Options';
import Game from './components/Game';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [bombsNoticed, setBombsNoticed] = useState(0)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [newGame, setNewGame] = useState(0)
  const changeSettingsHandler = (setting, val) => {
    setDifficulty(val)
    setIsGameRunning(false)
    setBombsNoticed(0)
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

  return (
    <div className={`App light`}>
      <h1>The minesweeper game</h1>
      <div className="wrapper">
        <Options bombsNoticed={bombsNoticed} 
        onChange={changeSettingsHandler} 
        difficulty={difficulty}
        restartGame={restartGame}
        isGameRunning={isGameRunning}
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
