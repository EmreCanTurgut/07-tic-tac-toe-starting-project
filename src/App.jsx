import Log from "./components/Log";
import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/GameBoard";

function deriveActivePlayer(gameTurns){

  let currentPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }return currentPlayer;

}

function App() {
  const [gameTurns,setGameTurns]=useState([]);
  // const [activePlayer,SetActivePlayer]=useState('X');

  const activePlayer=deriveActivePlayer(gameTurns);
 
  function handleSelectSquare(rowIndex,colIndex){
   // SetActivePlayer((currentActivePlayer)=>currentActivePlayer==='X'?'O':'X');
    setGameTurns(prevTurns=>{
      const currentPlayer=deriveActivePlayer(prevTurns)
  
      const updatedTurns=[{square: {row: rowIndex,col: colIndex},player:currentPlayer },...prevTurns]
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
           initialName={'Player1'} symbol={'X'} isActive={activePlayer ==='X'} />
          <Player initialName={'Player2'} symbol={'O'} isActive={activePlayer==='O'}/>
        </ol>   
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
