import React from 'react';

class unit extends React.Component {
    handleClick(event) {
        if (this.props.arrange.isCenter) {
            this.props.inverse()
        } else {
            this.props.center()
        }
        event.preventDefault();
        event.stopPropagation()
    }
    render() {
        var style = `controller-unit ${this.props.arrange.isCenter ? 'is-center' : ''} ${this.props.arrange.isInverse ? 'is-inverse' : ''}`
        return (
            <span className={style} onClick={this.handleClick}></span>
        )
    }
}
export default unit