import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import Box from './interface/results/Box.jsx';
import Graph from './interface/results/Graph.jsx';

import ScaleGraph from './interface/results/ScaleGraph.jsx';
import whitearrow from '../assets/images/resultswhitearrow.svg';

import Stats from './config/stats.json';


class Results extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      stats: Stats,
      q_1: null
    }
  }

  componentWillMount(){
    this.setState(function(state){
      console.log(state);
      state.q_1 = Math.round((state.stats.all.q_1.total/state.stats.all.q_1.count) * 10) / 10;
    })

    console.log(this.state)
  }

  componentDidMount(){
    console.log(this.state.stats);
    var DOMnode = ReactDOM.findDOMNode(this);

    TweenLite.from(DOMnode, 2.5, {
      width:0, 
      ease: Power4.easeOut
    });

    this.props.calculate();
  }


  render() {

  		return (
  			<div className="results">
          <div className="results__scalegraph-container">
            <div className="results__scalegraph-controller">
              <img className="results__scalegraph-controller-arrow" src={whitearrow}/>
              <h2>Jouw scores in vergelijking met anderen op basis van</h2>
              <ul>
                <li>je leeftijd</li>
                <li>je beroepssector</li>
                <li>je opleidingsniveau</li>
                <li>je werkmotivatie</li>
                <li>je geslacht</li>
              </ul>
            </div>
            <ScaleGraph
              headline="tevredenheid leven"
              yourScore={this.props.userMultipleScores.q_1}
              averageScore={this.state.q_1}
            />
            <ScaleGraph
              headline="tevredenheid werk"
              yourScore={this.props.userMultipleScores.q_2}
              averageScore={7.3}
            />  
            <ScaleGraph
              headline="salaris/geluk-ratio"
              yourScore={this.props.userMultipleScores.q_1+this.props.userMultipleScores.q_2/2}
              averageScore={9.5}
            /> 
            <ScaleGraph
              headline="job crafting"
              yourScore={this.props.userMultipleScores.q_4}
              averageScore={6.5}
            /> 
            <ScaleGraph
              headline="werkbetekenis"
              yourScore={this.props.userMultipleScores.q_5}
              averageScore={7.1}
            />                          
          </div>        
          <Box 
            cName="results__resultbox" 
            h3="Tevredenheid" top="100" left="150" delayTime="1" speed="1" width="300" height="350"
            p="Jouw werktevredenheid in vergelijking met mensen die ook in 'automotive' werken"
            ownScore={this.props.userScore}
            otherScore="7.0"/>

          { /* <Box 
            cName="results__layart" 
            h4="Het maakt na de eerste $70 000 voor je geluksgevoel niet meer uit hoeveel je extra verdient"
            p="Onder de Tegenlicht-kijkers lijkt dat inderdaad het geval te zijn. Mensen die meer dan E5800 p/m verdienen gaven hun leven gemiddeld een 7.6, terwijl mensen die daaronder zaten hun leven een 7.5 gaven"
            top="250" left="450" delayTime="1.6" speed="1" width="300" height="350"/> */ }


          <Graph top="10" left="1300" />
  			</div>
  		)
		}
}
export default Results;