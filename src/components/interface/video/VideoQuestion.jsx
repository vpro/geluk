// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../../assets/images/logo.svg';
import VideoOverlay from './VideoOverlay.jsx';
import VideoMC from './VideoMC.jsx';

class VideoQuestion extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      videoIntroduction: true,      
      videoOverlay: false,
      videoQuestion: false,
      video: false
    }
  }

  activateOverlay(){
    this.setState(function(state){
      state.videoOverlay = true;
    })
  }

  activator(disactivate, activate){
    this.setState(function(state){
      console.log(state);
      console.log('ik trigger')
      state[disactivate] = false;
      state[activate] = true;
    })
  }

  moveVideo(){
    var videoElem = ReactDOM.findDOMNode(this.refs.videoElement);
    TweenLite.to(videoElem, 1, {
      left: -250,
      ease: Power2.easeOut
    });
  }

  setLoader(){
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
    }




  componentDidMount(){
    var that = this;
    setTimeout(function(){ 
      that.activator('videoIntroduction', 'video');
      that.setLoader(); 
    }, 6000);

    setTimeout(function(){ 
      that.activator('videoIntroduction', 'videoQuestion');
      that.moveVideo();
    }, 13000);
  }

  render() {
		return (
			<div className="video">
        { this.state.videoIntroduction ?      
        <div className="video__introduction">
        <h1 className="video__question">in <a href="http://tegenlicht.vpro.nl/afleveringen/2015-2016/rendement-van-geluk.html" target="_blank">'rendement van geluk'</a> zegt schrijver aaron hurst dat je drijfveer om te werken, bepalend is voor je geluk op kantoor</h1>
        </div>
        : null }
        <span className="video__loader" ref="preloader"></span>


				{ this.state.videoOverlay ? <VideoOverlay
					headline="Aaron Hurst"
					tekst="Auteur van het boek 'The Purpose Economy'"
				  /> : null }

        { this.state.video ?
          <span className="video__imagecontainer" ref="videocontainer">
          <div className="video__container">
            <video autoPlay className="fillWidth" ref="videoElement" src="hurst.mp4">
              <source src="hurst.mp4" type="video/mp4"/>
              <em>Je browser ondersteunt geen HTML5-video</em>
            </video> 
          </div>
          </span> : null }

          {this.state.videoQuestion ?
          <VideoMC
            setMultipleChoice={this.props.setMultipleChoice}
            closeVideo={this.props.closeVideo}
          /> : null}

      </div>
    )
}
}

export default VideoQuestion;