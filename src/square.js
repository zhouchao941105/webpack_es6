import React from 'react'
//单元格
class Square extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         value: null
    //     }
    // }
    render() {
        return (
            <button className="square" onClick={() => this.props.cb()}>
                {this.props.value}
            </button>
        );
    }
}
export default Square