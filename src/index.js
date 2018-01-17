import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square'
import './index.css';
//五子棋
//区域
function H(initarr) {
    if (initarr.length < 9) {
        return false;
    }
    let lastPoint = initarr[initarr.length - 1]
    //横向
    let count = 1
    let currx = lastPoint.x;
    let curry = lastPoint.y;
    for (; curry > 0; curry--) {
        if (initarr.some(item => item.x == currx && item.y == (curry - 1))) {
            count++;
        } else {
            break;
        }
    }
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; curry < 4; curry++) {
        if (initarr.some(item => item.x == currx && item.y == (curry + 1))) {
            count++;
        } else {
            break;
        }
    }
    if (count == 5) {
        console.log(`${lastPoint.Xnext ? 'X' : 'O'}`);
        return lastPoint.Xnext ? 'X' : 'O';
    }
    count = 1;
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx > 0; currx--) {
        if (initarr.some(item => item.y == curry && item.x == (currx - 1))) {
            count++;
        } else {
            break;
        }
    }
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx < 4; currx++) {
        if (initarr.some(item => item.y == curry && item.x == (currx + 1))) {
            count++
        } else {
            break;
        }
    }
    if (count == 5) {
        console.log(`${lastPoint.Xnext ? 'X' : 'O'}`);
        return lastPoint.Xnext ? 'X' : 'O';
    }
    count = 1;
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx > 0; currx--) {
        if (curry > 0) {
            if (initarr.some(item => item.x = (currx - 1) && item.y == (curry - 1))) {
                count++
            } else {
                curry--
                continue;
            }
        } else {
            break;
        }
    }
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx < 4; currx++) {
        if (curry < 4) {
            if (initarr.some(unit => unit.x == (currx + 1) && unit.y == (curry + 1))) {
                count++
            } else {
                curry++
                continue
            }
        } else {
            break;
        }
    }
    if (count == 5) {
        console.log(`${lastPoint.Xnext ? 'X' : 'O'}`);
        return lastPoint.Xnext ? 'X' : 'O';
    }
}
class Board extends React.Component {
    constructor() {
        super();
        const arr = Array(5)
        for (var i = 0; i < arr.length; i++) {
            arr[i] = Array(5)
        }
        // 用Array(5).fill(Array(5))构造出来的二维数组有问题，每一项会保留同一引用
        this.state = {
            squares: arr,
            Xnext: true,
            filledArea: []
        }
    }
    handleClick(x, y) {
        if (this.state.squares[x][y]) {
            return;
        }
        const squares = this.state.squares.slice();
        squares[x][y] = this.state.Xnext ? 'x' : 'o';
        this.setState({
            squares: squares,
            Xnext: !this.state.Xnext,
            filledArea: this.state.filledArea.concat([{ x, y, Xnext: this.state.Xnext }])
        })
    }
    renderSquare(x, y) {
        return <Square value={this.state.squares[x][y]} cb={() => this.handleClick(x, y)} />;
    }
    // calculWinner(area) {
    //     if (area.length < 9) {
    //         return false;
    //     }
    //     let xarr = area.filter(item => item.Xnext)
    //     let oarr = area.filter(item => !item.Xnext)
    //     //横向
    //     if (xarr.map(item => item.x == 0).length >= 5) {
    //         let sortedarr = xarr.map(item => item.y).sort((a, b) => a - b)
    //         let sum = sortedarr.length % 2 == 0 ? (sortedarr[sortedarr.length / 2] + sortedarr[sortedarr.length / 2 - 1]) * 5 / 2 : sortedarr[(sortedarr.length - 1) / 2] * 5
    //         if (sortedarr.reduce((a, b) => a + b) === sum) {
    //             return 'X'
    //         }
    //     }
    //     console.log(xarr, oarr);
    //     //纵向
    //     //斜向 从上往下看为 左至右
    //     //反斜向 从上往下看为 右至左
    // }
    render() {
        const winner = H(this.state.filledArea)
        const status = winner ? `winner is ${winner}` : `Next player: ${this.state.Xnext ? 'x' : 'o'}`;
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
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
