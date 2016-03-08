// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

class Gelukoverlay extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var node = ReactDOM.findDOMNode(this);
    var text = this.refs.text;

    TweenLite.from(node, .4, {
      width: 0,
      padding: 0,
      display: 'block',
      ease: Power1.ease
    })

    TweenLite.from(text, .4, {
      y: 20,
      delay: .4,
      ease: Power1.ease,
      display: 'none'
    })
  }

  render() {
		return (
			<div className="questions__overlay">
				<p className="questions__overlaytext" ref="text">{this.props.text}</p>
			</div>
		)
	}
}

Gelukoverlay.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Gelukoverlay;