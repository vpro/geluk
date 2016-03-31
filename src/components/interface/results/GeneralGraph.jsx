import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import MillenialsGraph from './MillennialsGraph.jsx';
import GenderGraph from './GenderGraph.jsx';
import SalaryGraph from './SalaryGraph.jsx';

import millennials from '../../../assets/images/millennials.svg';
import salaristevredenheid from '../../../assets/images/salaristevredenheid.svg';
import mannenvrouwen from '../../../assets/images/mannenvrouwen.svg';

class GeneralGraph extends React.Component{
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
    if ( this.props.type == "millennials" ) {
      var logo = millennials
    } else if ( this.props.type == "salaristevredenheid" ) {
      var logo = salaristevredenheid
    } else {
      var logo = mannenvrouwen
    }
    var logoWidth = { width: this.props.logoWidth + 'px'}

  		return (
  			<div className="results__millennials" >
          <img style={logoWidth} src={logo} />

          <div ref="results">
            <p className="results__millennials-p">{this.props.text}</p> 

            { this.props.type == "millennials" ? 
              <MillenialsGraph
                width={this.props.logoWidth}
                stats={this.props.stats}/> 
              : null }

            { this.props.type == "mannenvrouwen" ? 
              <GenderGraph
              width={this.props.logoWidth}
              stats={this.props.stats}/> 
            : null }

            { this.props.type == "salaristevredenheid" ? 
              <SalaryGraph
              width={this.props.logoWidth}
              stats={this.props.stats}/> 
            : null }
          </div>
        </div>
  		)
		}
}
export default GeneralGraph;