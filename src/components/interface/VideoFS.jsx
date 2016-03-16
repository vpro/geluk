// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import placeholderOne from '../../assets/images/logo.svg';


class VideoFS extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
		return (
			<div>
      <video autoPlay className="video" loop src="https://onedrive.live.com/download?resid=78F211D646E63BBD!5026&authkey=!AEU8kraxXh3ouqk&ithint=video%2c.mp4">
      </video>
      </div>
    )
}
}

export default VideoFS;