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
        if (this.calculWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }
        const squares = this.state.squares.slice();
        squares[i] = this.state.Xnext ? 'x' : 'o';
        this.setState({
            squares: squares,
            Xnext: !this.state.Xnext
        })
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} cb={() => this.handleClick(i)} />;
    }
    calculWinner(squ) {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
        for (var i = 0, l = lines.length; i < l; i++) {
            let [x, y, z] = lines[i];
            if (squ[x] && squ[x] == squ[y] && squ[x] == squ[z]) {
                return squ[x]
            }
        }
        return false;
    }
    render() {
        var a=0;
        const winner = this.calculWinner(this.state.squares)
        const status = winner ? `winner is ${winner}` : `Next player: ${this.state.Xnext ? 'x' : 'o'}`;

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
