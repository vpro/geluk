// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import Commentbox from './Gelukcommentbox.jsx';

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

  showBox(){
    this.setState(function(state){
      state.showCommentBox = true;
    })
  }

  render() {
    if (this.props.text === "comment"){
      var tekst = "Wil je vertellen waarom je gisteren zo ongelukkig was?";
      var showButtons = true;
    } else {
      var tekst = this.props.text
    }
		return (
			<div className="questions__overlay">
				<p className="questions__overlaytext" ref="text">{tekst}</p>
        {showButtons ? <div><span className="questions__next--yellow">Liever niet</span>
          <span className="questions__next--yellow" onClick={this.showBox.bind(this)}>Ja</span></div> : null}
        {this.props.showCommentBox ? <Commentbox comment={this.props.comment} setAnswer={this.props.setAnswer.bind(this)} currentQuestion={this.props.currentQuestion}/> : null }
			</div>
		)
	}
}

Gelukoverlay.propTypes = {
  text: React.PropTypes.string
}

export default Gelukoverlay;