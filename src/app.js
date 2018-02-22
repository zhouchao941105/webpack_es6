import React from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'
import ImageFigure from './component/figure'
import ControllerUnit from './component/unit'
//获取两个值之间的随机值
function getRangeRandom(low, high) {
    //不用在意low是否小于high，所以没有做判断
    return Math.floor((high - low) * Math.random() + low)
}
//获取正负30之间的随机数
function get30DegRandom() {
    return Math.random() > 0.5 ? '' : '-' + Math.floor(Math.random() * 30)
}

class App extends React.Component {
    // state:{
    //     imageArrangeArray:[

    //     ]
    // }
    constructor(props) {
        super(props);
        this.Constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            //水平方向的取值范围
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            //垂直方向的取值范围
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        }
        //初始化数据
        var dataArray = this.props.imageDataArray;
        var tempArray = [];
        for (var i = 0; i < dataArray.length; i++) {
            let value = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
            tempArray.push(value)
        }
        this.state = {
            imageArrangeArray: tempArray
        }
    }
    //组件加载以后计算其位置
    componentDidMount() {
        //获得舞台大小
        var stageDom = ReactDOM.findDOMNode(this.refs.stage);
        var stageWidth = stageDom.scrollWidth;
        var stageHeight = stageDom.scrollHeight;

        var halfStageWidth = Math.floor(stageWidth / 2);
        var halfStageHeight = Math.floor(stageHeight / 2);

        //获取imageFigure的大小
        var imageFigureDom = ReactDOM.findDOMNode(this.refs.imageFigure0);
        var imageWidth = imageFigureDom.scrollWidth;
        var imageHeight = imageFigureDom.scrollHeight;

        var halfImageWidth = Math.floor(imageWidth / 2);
        var halfImageHeight = Math.floor(imageHeight / 2);

        //计算中心图片的位置
        this.Constant.centerPos = {
            left: halfStageWidth - halfImageWidth,
            top: halfStageHeight - halfImageHeight
        }

        //计算左右两侧 图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImageWidth;
        this.Constant.hPosRange.leftSecX[1] = halfStageWidth - halfImageWidth - imageWidth;
        this.Constant.hPosRange.rightSecX[0] = halfStageWidth + halfImageWidth;
        this.Constant.hPosRange.rightSecX[1] = stageWidth - halfImageWidth;

        this.Constant.hPosRange.y[0] = -halfImageHeight;
        this.Constant.hPosRange.y[1] = halfStageHeight - halfImageHeight;

        //计算上侧区域图片排布位置的范围
        this.Constant.vPosRange.topY[0] = -halfImageHeight;
        this.Constant.vPosRange.topY[1] = halfStageHeight - halfImageHeight - imageHeight;

        this.Constant.vPosRange.x[0] = halfStageWidth - imageWidth;
        this.Constant.vPosRange.x[1] = halfStageWidth;

        this.rearrange(0)
    }
    //翻转图片
    inverse(index) {
        return () => {
            var imgsArrangeArr = this.state.imageArrangeArray;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imageArrangeArray: imgsArrangeArr
            })
        }
    }
    //居中图片
    center(index) {
        return () => {
            this.rearrange(index)
        }
    }
    //重新布局所有图片
    rearrange(centerIndex) {
        let imgsArrangeArr = this.state.imageArrangeArray,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        imgsArrangeCenterArr[0].pos = centerPos;
        imgsArrangeCenterArr[0].isCenter = true;
        //居中的图片不需要翻转
        imgsArrangeCenterArr[0].rotate = 0;

        //去除要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                iscenter: false
            }
        })

        //布局左右两侧的图片
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;
            //前半部分布局左边，后半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeRightSecX;
            } else {
                hPosRangeLORX = hPosRangeLeftSecX
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imageArrangeArray: imgsArrangeArr
        })
    }

    render() {
        var controllerUnits = [],
            imageFigures = [];
        var dataArray = this.props.imageDataArray;
        dataArray.forEach((value, index) => {
            controllerUnits.push(<ControllerUnit key={index}
                arrange={this.state.imageArrangeArray[index]}
                center={this.center(index)}
                inverse={this.inverse(index)} />)
            imageFigures.push(<ImageFigure arrange={this.state.imageArrangeArray[index]}
                key={index} data={value}
                center={this.center(index)}
                inverse={this.inverse(index)}
                ref={`imageFigure${index}`} />);
        })
        return (
            <section className="stage" ref="stage">
                <section className="img-section">
                    {imageFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )
    }
}
export default App