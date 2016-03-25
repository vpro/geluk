import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import Box from './interface/results/Box.jsx';

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
            h3="arbeidsscore" top="100" left="150" delayTime="1" speed="1" width="300" height="350"
            p="Je hebt een 7 uit 10, mensen uit de Automotive-sector hebben gemiddeld een 8,3. Daarnaast verdienen zij gemiddeld meer dan jij (E 2400), maar de gemiddelde leeftijd ligt dan ook op 41 jaar!"/>
          <Box 
            cName="results__layart" 
            h4="Volgens de Britse econoom Layard maakt het voor je geluksgevoel geen verschil uit wanneer je meer dan $70000 per jaar verdient"
            top="250" left="450" delayTime="1.6" speed="1" width="300" height="350"/>
          <Box top="450" left="1800" delayTime="1" speed="1"/>
  			</div>
  		)
		}
}
export default Results;