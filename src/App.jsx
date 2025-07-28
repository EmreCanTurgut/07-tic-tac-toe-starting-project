import Log from "./components/Log";
import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  } return currentPlayer;

}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer,SetActivePlayer]=useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])]
  let winner = null;


  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    console.log(square);
    console.log(player)

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = firstSymbol
    }
  }
  const hasdraw= gameTurns.length ===9 && !winner


  function handleSelectSquare(rowIndex, colIndex) {
    // SetActivePlayer((currentActivePlayer)=>currentActivePlayer==='X'?'O':'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    });
  }
  const handleRestart=()=>{
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={'Player1'} symbol={'X'} isActive={activePlayer === 'X'} />
          <Player initialName={'Player2'} symbol={'O'} isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasdraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
