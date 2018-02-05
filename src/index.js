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


class Board extends React.Component{

  renderSquare(i)
  {
    return <Squares value={this.props.squares[i]} onClick={()=>(this.props.handleClick(i))}/>;
  }

  render()
  {
    var isX=this.state.isX?"O":"X";
    var Winner=this.props.winner;
    return(
    <div>
    <div>It is {isX}s turn </div>
      <div className="board-row">
      {this.renderSquare(0)}
      {this.renderSquare(1)}
      {this.renderSquare(2)}
      </div>
      <div className="board-row">
      {this.renderSquare(3)}
      {this.renderSquare(4)}
      {this.renderSquare(5)}
      </div>
      <div className="board-row">
      {this.renderSquare(6)}
      {this.renderSquare(7)}
      {this.renderSquare(8)}
      </div>

      <div>{declareWinner(this.props.squares)}</div>
    </div>
    );

  }
}

class Game extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      history:[
              {squares: Array(9).fill(null)}
            ],
      isX: false,
    };
  }
  handleClick(i)
  {
    const history=this.state.histroy;
    const current=history[history.length-1];
    const squares=current.squares.slice();


    if(!squares[i] && !declareWinner(squares))
    {
      squares[i]=this.state.isX?"O":"X";
      this.setState(
          {
          history[history.length-1]:squares,
          isX:!this.state.isX,
          }
        )
        declareWinner(this.state.squares);
    }


  }

  render(){
    const history=this.state.history;
    const current=history[history.length-1];
    const squares=current.squares.slice()
    return(
      <Board squares={current.squares[i]} onClick={(i)=>this.handleClick(i)}/>
    );
  }
}

//================================================================
ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
function declareWinner(value)
{
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