import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

class VideoMC extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this),
        inner = ReactDOM.findDOMNode(this.refs.inner);

    TweenLite.from(DOMnode, 1, {
      width:0, 
      right: 0,
      ease: Power2.easeOut
    });
    TweenLite.from(inner, 1, {
      y: 20,
      opacity: 0,
      right: 0,
      delay: 1,
      ease: Power2.easeOut
    });
  }
  
  closeVideo(){
    this.props.closeVideo();
  }

  setMultipleChoice(type){
    console.log(type);
    this.props.setMultipleChoice(type);
    this.closeVideo();
  }

  render() {
  		return (
          <div className="video__questioncontainer">
            <div className="video__border" ref="inner">
              <h1 className="video__question">Wat is jouw voornaamste drijfveer om te werken?</h1>
              <hr className="video__line"/>
              <ul className="video__multiplechoice">
              <li onClick={this.setMultipleChoice.bind(this, 'evil')}>noodzakelijk kwaad</li>
              <li onClick={this.setMultipleChoice.bind(this, 'career')}>carrière maken</li>
              <li onClick={this.setMultipleChoice.bind(this, 'calling')}>innerlijke roeping</li>
              </ul>
            </div>
          </div>
  		)
		}
}
export default VideoMC;