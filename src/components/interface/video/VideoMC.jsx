import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

class VideoMC extends React.Component{
  constructor(props){
    super(props);
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
            <div className="video__border">
              <h1 className="video__question">Wat is jouw voornaamste drijfveer om te werken?</h1>
              <hr className="video__line"/>
              <ul className="video__multiplechoice">
              <li onClick={this.setMultipleChoice.bind(this, 'evil')}>noodzakelijk kwaad</li>
              <li onClick={this.setMultipleChoice.bind(this, 'career')}>maken van carriere</li>
              <li onClick={this.setMultipleChoice.bind(this, 'calling')}>innerlijke roeping</li>
              </ul>
            </div>
          </div>
  		)
		}
}
export default VideoMC;