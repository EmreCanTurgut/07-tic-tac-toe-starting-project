import Log from "./components/Log";
import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer,SetActivePlayer]=useState('X');
  function handleSelectSquare(){
    SetActivePlayer((currentActivePlayer)=>currentActivePlayer==='X'?'O':'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
           initialName={'Player1'} symbol={'X'} isActive={activePlayer ==='X'} />
          <Player initialName={'Player2'} symbol={'O'} isActive={activePlayer==='O'}/>
        </ol>   
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      <Log/>
    </main>
  );
}

export default App;
