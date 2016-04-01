import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import Tegenlichtkijker from '../../../assets/images/tegenlichtkijker.png';
import Jouwscore from '../../../assets/images/jouwscore.png';


class Box extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
    var DOMcontent = ReactDOM.findDOMNode(this.refs.boxcontent);


    var thisDelay = (Number(this.props.delayTime) + Number(this.props.speed));
    console.log('initial delay', this.props.delayTime);
    console.log('this delay', thisDelay)

    TweenLite.from(DOMnode, this.props.speed, {
      width:0, 
      padding: 0,
      delay: this.props.delayTime,
      ease: Power2.easeOut
    });
    TweenLite.from(DOMcontent, this.props.speed, {
      opacity: 0,
      y: 20,
      delay: thisDelay,
      ease: Power2.easeOut
    });    
  }

  render() {
    var position = {
      top: this.props.top + 'px',
      left: this.props.left + 'px'
    }

    if (this.props.h3){
      var h3tag = this.props.h3
    }
    var cName = this.props.cName + ' results__box'
  		return (
  			<div className={cName}>
          <div className="results__box-content" ref="boxcontent">
          { this.props.h3 ? <h3>{this.props.h3}</h3> : null }
          { this.props.h4 ? <span className="results__altkop">{this.props.h4}</span> : null }
          { this.props.p ? <p>{this.props.p}</p> : null }

          <div className="results__circle-container"><span className="results__own-circle">{this.props.ownScore}</span><span className="results__own-circle results__right-circle">{this.props.otherScore}</span></div>
            <img className="results__kijkerscore" src={Tegenlichtkijker} />
            <img className="results__jouwscore" src={Jouwscore} />
          </div>
        </div>
  		)
		}
}
export default Box;