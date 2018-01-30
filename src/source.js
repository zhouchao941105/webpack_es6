import React from 'react'
import ReactDom from 'react-dom'
import figure from './figure'
import unit from './unit'

class App extends React.Component {
    state = {
        imageArrangeArray: [

        ]
    }
    constructor(props){
        super(props);
        this.Constant={
            centerPos:{
                left:0,
                right:0
            },
            hPosRange:{
                leftSecX:[0,0],
                rightSecX:[0,0],
                y:[0,0]
            },
            vPosRange:{
                x:[0,0],
                topY:[0,0]
            }
        }

        //初始化数据
        var dataArray=this.props.imageDataArray;
        var tempArray=[]
    }
}