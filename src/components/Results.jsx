import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import Box from './interface/results/Box.jsx';
import Graph from './interface/results/Graph.jsx';

class Results extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);

    TweenLite.from(DOMnode, 2.5, {
      width:0, 
      ease: Power4.easeOut
    });
  }


  render() {

  		return (
  			<div className="results">
          <Box 
            cName="results__resultbox" 
            h3="Tevredenheid" top="100" left="150" delayTime="1" speed="1" width="300" height="350"
            p="Jouw werktevredenheid in vergelijking met mensen die ook in 'automotive' werken"
            ownScore="6.3"
            otherScore="7.0"/>

          <Box 
            cName="results__layart" 
            h4="Het maakt na de eerste $70 000 voor je geluksgevoel niet meer uit hoeveel je extra verdient"
            p="Onder de Tegenlicht-kijkers lijkt dat inderdaad het geval te zijn. Mensen die meer dan E5800 p/m verdienen gaven hun leven gemiddeld een 7.6, terwijl mensen die daaronder zaten hun leven een 7.5 gaven"
            top="250" left="450" delayTime="1.6" speed="1" width="300" height="350"/>


          <Graph top="10" left="1300" />
  			</div>
  		)
		}
}
export default Results;