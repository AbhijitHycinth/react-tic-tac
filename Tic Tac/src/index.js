import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Squares(props){
  const x=props.value==props.winner?"square btn btn-success":"square btn btn-default";
  return(
    <button className={x} onClick={props.onClick}>
    {props.value}
    </button>
  )
}


function Board(props){

  function renderSquare(value)
  {
    return <Squares value={props.squares[value]} winner={props.winner} onClick={()=>(props.onClick(value))}/>;
  }

  function renderRow(row_index)
  {
    return(
      <div className="board-row">
      {renderSquare(row_index)}
      {renderSquare(row_index+1)}
      {renderSquare(row_index+2)}
      </div>
    )
  }

  function renderBoard()
  {
    let rows=[];
    for(let i=0;i<3;i++)
    {
      rows.push(renderRow(i*3));
    }
    return(rows);
  }

    return(
    <div>

      {renderBoard()}
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

  renderBoard(squares,winner){
    return(
      <Board squares={squares} winner={winner} onClick={(value)=>this.handleClick(value)}/>
          )
  }

  render(){
    const history=this.state.history;
    const current=history[this.state.stepNumber];
    const moves=history.map((step,index)=>
    {
      let x=index?"Go to step"+index:"Go to Start";
      return(
        <option value={index}>{x}</option>

      );
    });
    let winner=declareWinner(current.squares);
    let status;
    if(winner)
    status="The Winner is"+winner;
    else if (!winner)
      status=this.state.isX?"It is O's turn":"It is X's turn";

    return(
      <div>
      <div>{status}</div>
      <div>{this.renderBoard(current.squares,winner)}</div>
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
      return value[temp[0]];

    }
  }
  return false;
}
