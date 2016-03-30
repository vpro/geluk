import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import millennials from '../../../assets/images/millennials.svg';

class Millennials extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
    var DOMresults = ReactDOM.findDOMNode(this.refs.results);


    var thisDelay = (Number(this.props.delayTime) + .5);
    // console.log('initial delay', this.props.delayTime);
    // console.log('this delay', thisDelay)



    TweenLite.from(DOMnode, 1, {
      opacity: 0,
      y: 20,
      delay: this.props.delayTime,
      ease: Power2.easeOut
    });
    TweenLite.from(DOMresults, 1, {
      opacity: 0,
      y: 20,
      delay: thisDelay,
      ease: Power2.easeOut
    });    
  }

  render() {
    var millennialFirstWidth = {width: 350/100*30 + 'px', backgroundColor: '#eee'} ;
    var millennialSecondWidth = {width: 350/100*33 + 'px', backgroundColor: '#d6d6d6'} ;
    var millennialThirdWidth = {width: 350/100*36 + 'px', backgroundColor: '#000', color: '#FFF'} ;

    var babyboomersFirstWidth = {width: 350/100*20 + 'px', backgroundColor: '#eee'} ;
    var babyboomersSecondWidth = {width: 350/100*60 + 'px', backgroundColor: '#d6d6d6'} ;
    var babyboomersThirdWidth = {width: 350/100*20 + 'px', backgroundColor: '#000', color: '#FFF'} ;
  		return (
  			<div className="results__millennials" >
          <img width="350px" src={millennials} />

          <div ref="results">
          <p className="results__millennials-p">Volgens Hurst zoeken millennials (1980 - 2000) vaak meer ‘purpose’ (roeping) in hun werk dan vorige generaties. Hieronder zie je of dat bij Tegenlicht-kijkers ook het geval is.</p> 
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={millennialFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={millennialSecondWidth}>carriere</div>
            <div className="results__millennials-bar" style={millennialThirdWidth}>roeping</div>
          </div>

          <div className="results__millennials-graph results__millennials-margin">
            <div className="results__millennials-bar" style={babyboomersFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={babyboomersSecondWidth}>carriere</div>
            <div className="results__millennials-bar" style={babyboomersThirdWidth}>roeping</div>
          </div>
          </div>
        </div>
  		)
		}
}
export default Millennials;