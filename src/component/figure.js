import React from 'react'
class imgFigure extends React.Component {

    handleClick = (event) => {
        if (this.props.arrange.isCenter) {
            this.props.inverse()
        } else {
            this.props.center()
        }
        event.preventDefault();
        event.stopPropagation()
    }
    render() {
        //是否有传入类名
        let styleObj = this.props.arrange.pos || {}
        let imgClassName = `img-figure ${this.props.arrange.isInverse ? 'is-inverse' : ''}`
        return (
            <figure className={imgClassName} onClick={this.handleClick} style={styleObj}>
                <img src={this.props.data.imageUrl} alt={this.props.data.desc} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}
export default imgFigure