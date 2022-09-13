import Options from './components/Options';
import Game from './components/Game';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [color, setColor] = useState('dark')
  const changeSettingsHandler = (setting, val) => {
    if (setting === 'color') {
      setColor(val)
    }
    else {setDifficulty(val)}
  }

  return (
    <div className={`App ${color}`}>
      <h1 className={color} >The minesweeper game</h1>
      <div className="wrapper">
        <Options onChange={changeSettingsHandler}/>
        <Game difficulty={difficulty}/>
      </div>
    </div>
  );
}

export default App;
