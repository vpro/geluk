// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

class VideoOverlay extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
    var orangeCover = this.refs.cover;
    var text = this.refs.tekst;

    var initialDelay = 2;

    TweenLite.to(orangeCover, 0, {backgroundColor:'#000', delay: (initialDelay + 0.15)});
    TweenLite.to(orangeCover, 0, {backgroundColor:'#F50', delay: (initialDelay + 0.3)});
    TweenLite.to(orangeCover, .5, {opacity:0, delay: (initialDelay + 0.45)});

    TweenLite.from(text, 1, {opacity:0, delay: (initialDelay + 0.6)});

    TweenLite.from(DOMnode, 1, {
      opacity: 0,
      delay: initialDelay,
      ease: Power1.ease
    });

    TweenLite.to(DOMnode, 1, {
      opacity: 0,
      delay: initialDelay + 8,
      ease: Power1.ease
    });
  }

  render() {
		return (
		<div className="video__box">
			<div className="video__boxcontent">
        <span className="video__orangecover" ref="cover"></span>
        <span ref="tekst">
  				<span className="video__tagline">{this.props.headline}</span>
  				<span className="video__meta">{this.props.tekst}</span>
          <span className="video__button"></span>
        </span>
  		</div>
  	</div>
    )
  }
}

export default VideoOverlay;