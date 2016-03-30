import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

class Millenials extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // var DOMnode = ReactDOM.findDOMNode(this);
    // var DOMcontent = ReactDOM.findDOMNode(this.refs.boxcontent);


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
  		return (
  			<div className="results__millenials" >
          <p>Blablablablablablablabalbal</p>
        </div>
  		)
		}
}
export default Millenials;