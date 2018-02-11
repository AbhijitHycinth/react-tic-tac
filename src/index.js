import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Squares(props){
  return(
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  )
}


function Board(props){

  function renderSquare(i)
  {
    return <Squares value={props.squares[i]} onClick={()=>(props.onClick(i))}/>;
  }

    return(
    <div>
      <div className="board-row">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      </div>
      <div className="board-row">
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      </div>
      <div className="board-row">
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
      </div>
    </div>
    );


}

class Game extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      history:[
              {squares: Array(9).fill(null)}
            ],
      stepNumber:0,
      isX: false,
    };
  }
  handleClick(i)
  {
    const history=this.state.history;
    const current=history[history.length-1];
    const squares=current.squares.slice();


    if(!squares[i] && !declareWinner(squares))
    {
      squares[i]=this.state.isX?"O":"X";
      this.setState(
          {
          history:history.concat([{squares:squares}]),
          stepNumber:this.state.history.length,
          isX:!this.state.isX,
          }
        );
    }


  }
  jumpTo(step){
    this.setState(
      {
        stepNumber:step,
        isX: (this.state.stepNumber%2===0),
      }
    );
  }

  renderBoard(squares){
    return(
      <Board squares={squares} onClick={(i=null)=>this.handleClick(i)}/>
          )
  }

  render(){
    const history=this.state.history;
    const current=history[this.state.stepNumber];
    //var value=this.stepNumber;
    //this.
    const moves=history.map((step,index)=>
    {
      let x=index?"Go to step"+index:"Go to Start";
      return(
        //<li key={index}>
        <option value={index}>{x}</option>

      );
    });
    var status=declareWinner(current.squares);
    if (!status)
      status=this.state.isX?"It is O\'s turn":"It is X\'s turn";

    return(
      <div>
      <div>{status}</div>
      <div>{this.renderBoard(current.squares)}</div>
      <select onChange={(event)=>{this.jumpTo(event.target.value)}}>{moves}</select>
      </div>
    );
  }
}

//----------------------
ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
function declareWinner(value)
{
  if(!value) return false;
  const winMatrix=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let temp of winMatrix)
  {
    if(value[temp[0]] && value[temp[0]]===value[temp[1]] && value[temp[1]]===value[temp[2]])
    {
      return "The Winner is "+value[temp[0]];

    }  }
}
