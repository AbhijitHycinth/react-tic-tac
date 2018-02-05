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
  constructor(props)
  {
    super(props);
    this.state={
      squares: Array(9).fill(null),
      isX: false,
    };
  }


handleClick(i)
{
  let value=this.state.squares.slice();

  if(!value[i] && !declareWinner(this.state.squares))
  {
    value[i]=this.state.isX?"O":"X";
    this.setState(
        {
        squares:value,
        isX:!this.state.isX,
        }
      )
      declareWinner(this.state.squares);
  }


}
  renderSquare(i)
  {
    return <Squares value={this.state.squares[i]} onClick={()=>(this.handleClick(i))}/>;
  }

  render()
  {
    var isX=this.state.isX?"O":"X";
    var Winner=this.state.winner;
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

      <div>{declareWinner(this.state.squares)}</div>
    </div>
    );

  }
}

//================================================================
ReactDOM.render(
  <Board/>,
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
