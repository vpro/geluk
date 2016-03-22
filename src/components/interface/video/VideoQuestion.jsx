// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../../assets/images/logo.svg';
import image from '../../../assets/images/screen.png';
import VideoOverlay from './VideoOverlay.jsx'

class VideoQuestion extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      videoOverlay: false
    }
  }

  activateOverlay(){
    this.setState(function(state){
      state.videoOverlay = true;
    })
  }

  closeVideo(){
    this.props.closeVideo();
  }

  componentDidMount(){
    window.addEventListener('load', function() {
      var videoContainer = ReactDOM.findDOMNode(this),
          preloader = ReactDOM.findDOMNode(this.refs.preloader),
          videoElem = ReactDOM.findDOMNode(this.refs.videoElement),
          that = this;

      function checkLoad() {
        if (videoElem.readyState === 4) {
          videoContainer.removeChild(preloader);
          that.activateOverlay();
          setTimeout(that.closeVideo.bind(that), 100000)
        } else {
          setTimeout(checkLoad, 100);
        }
      }
           
      checkLoad();
    }.bind(this), false);


  }


  render() {
		return (
			<div className="video">
        <span className="video__loader" ref="preloader"></span>

        { this.state.videoOverlay ? <span className="video__close" onClick={this.closeVideo.bind(this)}><i class="glyph glyph-close"></i></span> : null}

				{ this.state.videoOverlay ? <VideoOverlay
					headline="Aaron Hirsch"
					tekst="Schrijver van het boek Purpose Economy"
				  /> : null }
          <span className="video__imagecontainer">
          <img className="video__imageholder" src={image}/>
          </span>
          <div className="video__questioncontainer">
            <div className="video__border">
              <h1 className="video__question">Wat is jouw voornaamste drijfveer om te werken?</h1>
              <hr className="video__line"/>
              <ul className="video__multiplechoice">
              <li>a) noodzakelijk kwaad</li>
              <li>b) maken van carriere</li>
              <li>c) innerlijke roeping</li>
              </ul>
            </div>
          </div>
        <video autoPlay className="video__element" ref="videoElement" loop src="fragment.mp4"> 
      </video>

      </div>
    )
}
}

export default VideoQuestion;