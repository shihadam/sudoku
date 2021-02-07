import React, { Component } from 'react';
import Cell from './Cell';
import '../style.css';

class Tile extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
        x: props.x,
        y: props.y,
        board: props.board,
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.board !== prevProps.board) {
      this.setState({
        board: this.props.board,
      });
    }
  }

  render() {
      const { x, y, isSolved, parentCallback, handleSelection } = this.props;

      return (
        <div id='tile'>
            <div className='row'>
                <Cell x={x * 3 + 0} y={y * 3 + 0}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 1} y={y * 3 + 0}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 2} y={y * 3 + 0}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
            </div>
            <div className='row'>
                <Cell x={x * 3 + 0} y={y * 3 + 1}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 1} y={y * 3 + 1}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 2} y={y * 3 + 1}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
            </div>
            <div className='row'>
                <Cell x={x * 3 + 0} y={y * 3 + 2}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 1} y={y * 3 + 2}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
                <Cell x={x * 3 + 2} y={y * 3 + 2}  board={this.state.board} isSolved={isSolved} parentCallback={parentCallback} handleSelection={handleSelection} />
            </div>
        </div>
      );
  }
}

export default Tile;