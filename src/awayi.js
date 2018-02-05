import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Squares extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: 'X',
    }
  }
  render()
  {
    return(
    <button className="square">{this.state.value}</button>
    );
  }
}


class Board extends React.Component{
  renderSquare(){
    return <Squares/>;
    }
  render(){
    return(
      <div>{this.renderSquare()}{this.renderSquare()}</div>
      /*for (let i=0;i<3;i++)
      {
        <div className="Square-board">
        <div>{this.renderSquare(i*0)}</div>
        <div>{this.renderSquare(i*2)}</div>
        <div>{this.renderSquare(i*3)}</div>
        </div>
      }*/
    );
  }
}
