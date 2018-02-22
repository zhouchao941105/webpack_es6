import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square'
import './index.css';
import App from './app'
import srcimageDatas from './imageData'
//五子棋
//区域
//计算是否五子连线
function H(initarr) {
    if (initarr.length < 5) {
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
    for (; curry < 19; curry++) {
        if (initarr.some(item => item.x == currx && item.y == (curry + 1))) {
            count++;
        } else {
            break;
        }
    }
    if (count > 4) {
        return lastPoint.Xnext ? 'O' : 'X';
    }
    //纵向
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
    for (; currx < 19; currx++) {
        if (initarr.some(item => item.y == curry && item.x == (currx + 1))) {
            count++
        } else {
            break;
        }
    }
    if (count > 4) {

        return lastPoint.Xnext ? 'O' : 'X';
    }
    //左到右 上到下
    count = 1;
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx > 0; currx--) {
        if (curry > 0) {
            if (initarr.some(item => item.x == (currx - 1) && item.y == (curry - 1))) {
                count++
                curry--
            } else {
                continue;
            }
        } else {
            break;
        }
    }
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx < 19; currx++) {
        if (curry < 19) {
            if (initarr.some(unit => unit.x == (currx + 1) && unit.y == (curry + 1))) {
                count++
                curry++
            } else {
                continue
            }
        } else {
            break;
        }
    }
    if (count > 4) {

        return lastPoint.Xnext ? 'O' : 'X';
    }
    //左到右 下到上
    count = 1;
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx > 0; currx--) {
        if (curry < 19) {
            if (initarr.some(item => item.x == (currx - 1) && item.y == (curry + 1))) {
                count++
                curry++
            } else {
                continue
            }
        }
    }
    currx = lastPoint.x;
    curry = lastPoint.y;
    for (; currx < 19; currx++) {
        if (curry > 0) {
            if (initarr.some(item => item.x == (currx + 1) && item.y == (curry - 1))) {
                count++
                curry--
            }
        }
    }
    if (count > 4) {

        return lastPoint.Xnext ? 'O' : 'X';
    }
    return false
}
class Board extends React.Component {
    constructor() {
        super();
        const arr = Array(20)
        for (var i = 0; i < arr.length; i++) {
            arr[i] = Array(20)
        }
        // 用Array(5).fill(Array(5))构造出来的二维数组有问题，每一项会保留同一引用
        this.state = {
            squares: arr,
            Xnext: true,
            filledArea: []
        }
        this.verticalData = Array(20).fill('').map((item, idx) => idx)
        this.horizentalData = Array(20).fill('').map((item, idx) => idx)
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
            filledArea: this.state.filledArea.concat([{ x, y, Xnext: !this.state.Xnext }])
        })
    }
    renderSquare(x, y) {
        return <Square key={100 * x + y} value={this.state.squares[x][y]} cb={() => this.handleClick(x, y)} />;
    }
    render() {
        const Xarr = this.state.filledArea.filter(item => !item.Xnext)
        const Oarr = this.state.filledArea.filter(item => item.Xnext)
        const winner = H(Xarr) || H(Oarr)
        const status = winner ? `winner is ${winner}` : `Next player: ${this.state.Xnext ? 'X' : 'O'}`;
        this.initCell = (i) => {
            return <div className="board-row" key={i.toString()}>
                {this.verticalData.map((item, idx) => this.renderSquare(i, item))}
            </div>
        }
        return (
            <div>
                <div className="status">{status}</div>
                {this.horizentalData.map((i) => this.initCell(i))}
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
//画廊
//获取图片相关数据
var imageDatas = ((imageDataArray) => {
    for (var i = 0; i < imageDataArray.length; i++) {
        imageDataArray[i].imageUrl = require("./images/" + imageDataArray[i].fileName);
    }
    return imageDataArray
})(srcimageDatas)
ReactDOM.render(
    <App imageDataArray={imageDatas} />,
    document.getElementById('root')
);
if (module.hot)
    module.hot.accept()
