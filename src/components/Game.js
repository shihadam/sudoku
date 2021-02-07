import React, { Component } from 'react';
import Board from './Board';
import Timer from './Timer';
import * as solver from '../utils/solver.js';
import '../style.css';
const boards = require('../data/board_data.json');

class Game extends Component {
  constructor(props) {
      super(props); 

      this.state = {
        board: null,
        solved: null,
        isSolved: false,
        boardHide: '',
        solvedHide: 'hidden',
        hints: 5,
      };
  }

  loadBoard = () => {                                   
    const size = boards.data.length;
    const rand = Math.floor(Math.random() * size);
    const temp = copy(boards.data[rand]);

    //start timer
    this.timer.start();

    this.setState({
      board: boards.data[rand],
      solved: solver.solve(temp),
      hints: 5,
    });

    // console.log(boards.data[rand]);
    //console.log(solver.solve(boards.data[rand]));
  }

  toggleSolution = () => {
    if(this.state.isSolved) {
      this.setState({
        isSolved: false,
        boardHide: '',
        solvedHide: 'hidden',
      });
    } else {
      this.setState({
        isSolved: true,
        boardHide: 'hidden',
        solvedHide: '',
      });
    }
  }

  checkBoard = () => {
    const { board, solved } = this.state;

    if(JSON.stringify(board) === JSON.stringify(solved)) {
      this.timer.stop();
      alert('You are correct!');
    }
    else
      alert('Board is not correct, try again.');
  }

  hint = () => {
    const selection = this.board.state.selected;
    let hints = this.state.hints;
    if(selection.x === null || selection.y === null || this.state.board === null || hints <= 0)
      return;

    const temp = copy(this.state.board);
    temp[selection.y][selection.x] = this.state.solved[selection.y][selection.x];

    this.setState({
      board: temp,
      hints: hints - 1,
    });

  }

  render() {
    const { board, solved, isSolved, boardHide, solvedHide } = this.state;   

    return (
      <div id='game'>
        <Timer id='timer' onRef={ref => (this.timer = ref)} start={new Date()} />
        <Board onRef={ref => (this.board = ref)} className={boardHide} board={board} isSolved={isSolved} />
        <Board onRef={ref => (this.solved = ref)} className={solvedHide} board={solved} isSolved={isSolved} />
        <div id='buttons'>
          <button id='new-game' className='button' onClick={this.loadBoard}>New Game</button>
          <button className='button' onClick={window.print}>Print</button>
          <button id='check' className='button' onClick={this.checkBoard}>Check</button>
          <button id='hint' className='button' onClick={this.hint}>Hint : {this.state.hints}</button>
        </div>
      </div>
    );
  }
}

function copy(src) {
    const copy = [];

    for(let i = 0; i < src.length; i++) {
        copy[i] = [...src[i]];
    }

    return copy;
}

export default Game;