// notice properties takeTurn and id are being passed in
const Square = ({ id, newState }) => {
 // const [color, setColor] = React.useState("plum");
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];
  
 
  // id is the square's number
  // We call takeTurn to tell Parent we have clicked in this square

  
  React.useEffect(()=>{
    console.log(`Render ${id}`);
    return ()=> console.log(`unmountered Square ${id}`);
    
  });
  
  return (
    <button
    className={status == '1' ? 'purple' : 'palevioletred'}
    Name={status == '0' ? 'white' : 'black'}
    onClick={(e) => {
      let nextplayer = newState(id);
       setStatus(nextplayer);
      }}
      >
      <h1>{XorO[status]}</h1>
    </button>
  );
};

function checkWinner(state) {
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i=0; i <win.length; i++) {
  const [a,b,c] = win[i];
  if (state[a] == state[b] && state [a] == state[c] && state[c] == state[b])
    return state[a];
}
return (null);

}

const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  
  // check for winner (see superset.js)
  // set state here
  let status = `Turn of Player: ${player == '0' ? 'O' : 'X'}`;
  
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner == '0' ? 'O' : 'X'} Wins`;
  
  let playerTurn = `Next Player: ${player == '0' ? 'X' : 'O'}`;
  console.log(`Status Player ${status}`);
  

  //define a newState function
  const newState =idofSquare => {
    let thePlayer = player;
    
    state[idofSquare] = player; // player is present player
    setState(state); // state is array of 0 or 1 or null
    let nextplayer = (player + 1) % 2;
    
    setPlayer(nextplayer);
    return thePlayer; // we need to return the present player
    
  };

  // Note that Child (Square Component) calls this function
  // However the function has access to the player held here
  
  const refresh = () => window.location.reload(true)

  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h2>{status}</h2>
        <h2 id="turn">{playerTurn}</h2>
        <button id="restart" onClick={refresh}>Restart Game</button>
      </div>
      
      
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
      
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
