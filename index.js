import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

class Square extends React.Component{

    render()
    {
      return(
        <button className="Square">
        {this.props.value}
        </button>
      );
    }
}

class Board extends React.Component{
  renderSquare(i){
    return <Square value={i}/>;
  }
  render()
  {
    const status="Next Player:X";
    return(
      <div>
       <div className="Status">{status}</div>
       <div className="Board-row">
       {this.renderSquare(0)}
       {this.renderSquare(1)}
       {this.renderSquare(2)}
      </div>
      <div className="Board-row">
      {this.renderSquare(3)}
      {this.renderSquare(4)}
      {this.renderSquare(5)}
      </div>
      <div className="Board-row">
      {this.renderSquare(6)}
      {this.renderSquare(7)}
      {this.RenderSquare(8)}
      </div>
      </div>
    );
  }
}

class Game extends React.Component{
  render(){
    return(
      <div className="Game">
      <div className="Game-board">
      <Board />
      </div>
      <div className="Game-status">
      <div>{"Status"}</div>
      </div>
      </div>
    )
  }
}


//================================================

ReactDOM.render(
  <Game />, document.getElementById('root')
);
