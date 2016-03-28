// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../../assets/images/logo.svg';
import image from '../../../assets/images/screen.png';
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
    }, 3000);



    console.log(window);

    // window.addEventListener('click', function() {
    //   var videoContainer = ReactDOM.findDOMNode(this),
    //       preloader = ReactDOM.findDOMNode(this.refs.preloader),
    //       videoElem = ReactDOM.findDOMNode(this.refs.videoElement),
    //       that = this;

    //   function checkLoad() {
    //     if (videoElem.readyState === 4) {
    //       videoContainer.removeChild(preloader);
    //       that.activateOverlay();
    //       setTimeout(that.closeVideo.bind(that), 100000)
    //     } else {
    //       setTimeout(checkLoad, 100);
    //     }
    //   }
           
    //   checkLoad();
    // }.bind(this), false);
  }

  render() {
		return (
			<div className="video">
        { this.state.videoIntroduction ?      
        <div className="video__introduction">
        <h1 className="video__question">Tijdens de aflevering 'Rendement van geluk' vertelt Aaron Hirst dat je voornaamste drijfveer om te werken bepalend is voor jouw geluk op kantoor.</h1>
        </div>
        : null }
        <span className="video__loader" ref="preloader"></span>


				{ this.state.videoOverlay ? <VideoOverlay
					headline="Aaron Hirst"
					tekst="Schrijver van het boek Purpose Economy"
				  /> : null }

        { this.state.video ?
          <span className="video__imagecontainer">
          <div className="video__container">
            <video autoPlay className="fillWidth" ref="videoElement" src="hirst.mp4"></video> 
          </div>
          <img className="video__imageholder" src={image}/>
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