// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../../assets/images/logo.svg';
import VideoOverlay from './VideoOverlay.jsx'

class VideoFS extends React.Component{
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
          setTimeout(that.closeVideo.bind(that), 10000)
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


      </div>
    )
}
}

export default VideoFS;