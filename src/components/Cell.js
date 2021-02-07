import React, { Component } from 'react';
import '../style.css';

class Cell extends Component {
  constructor(props) {
      super(props);

      this.state = {
          data: this.formatData(),
          isDisabled: this.isDisabled(),
          borderRadius: this.handleRadius(),
          classNames: `cell ${this.handleClassNames()}`,
      };
  }

  componentDidUpdate(prevProps) {
    if(this.props.board !== prevProps.board) {
      this.setState({
        data: this.formatData(),
        isDisabled: this.isDisabled(),
      });
    }
  }

  formatData() {
    const { x, y, board } = this.props;
    let data = '';

    if(board === null)
      return data;

    if(board[y][x] !== 0)
      data = board[y][x];

    return data;
  }

  isDisabled() {
    const { x, y, board, isSolved } = this.props;

    if(board === null)
      return true;

    if(isSolved)
      return true;
    else if(board[y][x] !== 0)
      return true;

    return false;
  }

  handleClassNames() {
    let classes = '';
    const { x, y } = this.props;

    if(x % 3 === 2)
      classes += ' border-right';
    if(x === 0)
      classes += ' border-left';
    if(y % 3 === 2)
      classes += ' border-bottom';
    if(y === 0)
      classes += ' border-top';

    return classes;
  }

  //return new radius of cell
  handleRadius() {
    let radius = '0 0 0 0';
    const { x, y } = this.props;

    //round corners
    if(x === 0 && y === 0)
      radius = '30% 0 0 0';
    else if(x === 8 && y === 0)
      radius = '0 30% 0 0';
    else if(x === 0 && y === 8)
      radius = '0 0 0 30%';
    else if(x === 8 && y === 8)
      radius = '0 0 30% 0';

    return radius;
  }

  handleClick = () => {
    const { x, y, handleSelection } = this.props;

    handleSelection({
      x: x,
      y: y,
    });
  }

  handleChange = (e) => {
    const { x, y, parentCallback } = this.props;
    let val = Number.parseInt(e.target.value);

    if(Number.isInteger(val) && val !== 0) {
      this.setState({
        data: val,
      });

      parentCallback({
        x: x,
        y: y,
        data: val,
      });
    }
  }

  handleKeydown = (e) => {
    const { x, y, parentCallback } = this.props;
    if(e.key === 'Backspace') {
      this.setState({
        data: '',
      });

      parentCallback({
        x: x,
        y: y,
        data: 0,
      });
    }
  }

  render() {
    const { classNames } = this.state;
    return (
      <div>
        <input 
          className={classNames} 
          style={{borderRadius: this.state.borderRadius}} 
          type='text' 
          value={this.state.data}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          maxLength='1'
          disabled={this.state.isDisabled}
        />
      </div>
    );
  }
}

export default Cell;