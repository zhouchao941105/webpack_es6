import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square'
import './index.css';

//区域
class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            Xnext: true
        }
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.Xnext ? 'x' : 'o';
        this.setState({ squares: squares, Xnext: !this.state.Xnext })
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} cb={() => this.handleClick(i)} />;
    }
    render() {
        const status = `Next player: ${this.state.Xnext ? 'x' : 'o'}`;

        return (
            <div>
                <div className="status">{status}</div>
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
                <p>{this.state.squares[4]}</p>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                <p>12345</p>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
if (module.hot)
    module.hot.accept()
