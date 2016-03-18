// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../../assets/images/logo.svg';
import VideoOverlay from './VideoOverlay.jsx'

class VideoFS extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
		return (
			<div className="video">
				<VideoOverlay
					headline="Aaron Hirsch"
					tekst="Schrijver van het boek Purpose Economy"
				/>
      <video autoPlay className="video__element" loop src="https://onedrive.live.com/download?resid=78F211D646E63BBD!5026&authkey=!AEU8kraxXh3ouqk&ithint=video%2c.mp4">
      </video>

      </div>
    )
}
}

export default VideoFS;