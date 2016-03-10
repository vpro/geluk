// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import Comment from './Gelukcomment.jsx';

class Gelukoverlay extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var node = ReactDOM.findDOMNode(this);
    var buttons = this.refs.overlaybuttons;
    var text = this.refs.text;

    TweenLite.from(node, .4, {
      width: 0,
      padding: 0,
      display: 'block',
      ease: Power1.ease
    });

    TweenLite.from(text, .4, {
      y: 20,
      delay: .4,
      ease: Power1.ease,
      display: 'none'
    });

    if (this.props.text === "comment") {
      TweenLite.to(buttons, .4, {
        y: -20,
        delay: .4,
        ease: Power1.ease,
        display: 'block'
      });
    }

  }

  showBox(event){
    var parentNode = this.props.moduleDOM,
        thisNode = ReactDOM.findDOMNode(this),
        text = this.refs.text,
        buttons = this.refs.overlaybuttons,
        comment = ReactDOM.findDOMNode(this.refs.comment),
        fullWidth = window.innerWidth;

    [parentNode, thisNode].map(function(elements){
      return TweenLite.to(elements, .4, {
        minWidth: fullWidth,
        delay: .5,
        display: 'block',
        ease: Power1.ease
      });
     });        
    [text, buttons].map(function(elements){
      return TweenLite.to(elements, .4, {
        opacity: 0,
        y: 20,
        display: 'none',
        ease: Power1.ease
      });
     });
    TweenLite.to(comment, 1, {
      width: 0,
      padding: 0,
      delay: 1,
      y: -20,
      display: 'block',
      ease: Power1.ease
    })
  }

  submitNext(event){
    this.props.setNext();
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
        { showButtons ? 
          <div className="questions__overlaybuttons" ref="overlaybuttons">
            <span className="questions__next--yellow" onClick={this.submitNext.bind(this)}>Liever niet</span>
            <span className="questions__next--yellow" onClick={this.showBox.bind(this)}>Ja</span>
          </div> : null
        }
        
        { this.props.showComment ? 
          <Comment 
            module={this.props.module}
            comment={this.props.comment} 
            setAnswer={this.props.setAnswer.bind(this)}
            happinessValue={this.props.happinessValue} 
            ref="comment"
            currentQuestion={this.props.currentQuestion}
          /> : null 
        }
			</div>
		)
	}
}

Gelukoverlay.propTypes = {
  text: React.PropTypes.string,
  comment: React.PropTypes.string
}

export default Gelukoverlay;