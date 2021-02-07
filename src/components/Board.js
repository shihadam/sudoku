import React, { Component } from 'react';
import Tile from './Tile';
import '../style.css';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: props.board,
            selected: { x: null, y: null },
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    componentDidUpdate(prevProps) {
        if(this.props.board !== prevProps.board) {
            this.setState({
                board: this.props.board,
            });
        }
    }

    handleCallback = (childData) => {
        let b = this.state.board;
        b[childData.y][childData.x] = childData.data;

        this.setState({
            board: b,
        });
    }

    handleSelection = (childData) => {
        this.setState({
            selected: { x: childData.x, y: childData.y },
        });
    }

    render() {
        return (
            <div className={this.props.className} id='board'>
                <div className='row'>
                    <Tile x='0' y='0' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='1' y='0' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='2' y='0' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                </div>
                <div className='row'>
                    <Tile x='0' y='1' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='1' y='1' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='2' y='1' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                </div>
                <div className='row'>
                    <Tile x='0' y='2' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='1' y='2' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                    <Tile x='2' y='2' board={this.state.board} isSolved={this.props.isSolved} parentCallback={this.handleCallback} handleSelection={this.handleSelection} />
                </div>
            </div>
        );
    }
}

export default Board;