import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import whitearrow from '../../../assets/images/resultswhitearrow.svg';
import orangearrow from '../../../assets/images/resultsorangearrow.svg';

class Graph extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
    var DOMcontent = ReactDOM.findDOMNode(this.refs.boxcontent);


    // var thisDelay = (Number(this.props.delayTime) + Number(this.props.speed));
    // console.log('initial delay', this.props.delayTime);
    // console.log('this delay', thisDelay)



    // TweenLite.from(DOMnode, this.props.speed, {
    //   width:0, 
    //   padding: 0,
    //   delay: this.props.delayTime,
    //   ease: Power2.easeOut
    // });
    // TweenLite.from(DOMcontent, this.props.speed, {
    //   opacity: 0,
    //   y: 20,
    //   delay: thisDelay,
    //   ease: Power2.easeOut
    // });    
  }

  render() {
    var position = {
      top: this.props.top + '%',
      left: this.props.left + 'px'
    }

    var positionYours = {
      top: '30'+'%'
    }

    var positionOthers = {
      top: '90'+'%'
    }
  		return (
  			<div className="results__graph" style={position}>
          <div className="results__graph-scale"></div>

          <div className="results__yours" style={positionYours}>
            <img className="results__arrow" src={whitearrow}/>
            € 2457
          </div>
          <div className="results__others" style={positionOthers}>
            <img className="results__arrow" src={orangearrow}/>
            € 3457
          </div>

        </div>
  		)
		}
}
export default Graph;