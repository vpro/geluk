import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

import Box from './interface/results/Box.jsx';
// import Graph from './interface/results/Graph.jsx';
import GeneralGraph from './interface/results/GeneralGraph.jsx';

import ScaleGraph from './interface/results/ScaleGraph.jsx';
import whitearrow from '../assets/images/resultswhitearrow.svg';

import Stats from './config/stats.json';


class Results extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      // stats: Stats,
      showPersonal: true,
      showGeneral: false,
      q_1: null,
      q_2: null,
      q_3: null,
      q_4: null,
      q_5: null, 
      active: {
        age: true,
        job: false,
        education: false,
        work: false,
        gender: false
      }
    }
  }

  componentWillMount(){
    console.log(this.props);

    this.setState( (state) => {
      console.log('will mount', this)
      state.q_1 = Math.round((this.props.generatedStats.all.q_1.total/this.props.generatedStats.all.q_1.count) * 10) / 10;
      state.q_2 = Math.round((this.props.generatedStats.all.q_2.total/this.props.generatedStats.all.q_2.count) * 10) / 10;
      state.q_3 = Math.round((this.props.generatedStats.all.q_3.total/this.props.generatedStats.all.q_3.count) * 10) / 10;
      state.q_4 = Math.round((this.props.generatedStats.all.q_4.total/this.props.generatedStats.all.q_4.count) * 10) / 10;
      state.q_5 = Math.round((this.props.generatedStats.all.q_5.total/this.props.generatedStats.all.q_5.count) * 10) / 10;

      // state.q_1 = Math.round((this.state.stats.all.q_1.total/this.state.stats.all.q_1.count) * 10) / 10;
      // state.q_2 = Math.round((this.state.stats.all.q_2.total/this.state.stats.all.q_2.count) * 10) / 10;
      // state.q_3 = Math.round((this.state.stats.all.q_3.total/this.state.stats.all.q_3.count) * 10) / 10;
      // state.q_4 = Math.round((this.state.stats.all.q_4.total/this.state.stats.all.q_4.count) * 10) / 10;
      // state.q_5 = Math.round((this.state.stats.all.q_5.total/this.state.stats.all.q_5.count) * 10) / 10;
    }, console.log('setState', this.state))

  }

  componentDidMount(){
    console.log(this.props.generatedStats);
    var DOMnode = ReactDOM.findDOMNode(this);
    var scalegraph = ReactDOM.findDOMNode(this.refs.scalegraph);
    var scalegraphController = ReactDOM.findDOMNode(this.refs.scalegraphcontroller);
    var generalResults = ReactDOM.findDOMNode(this.refs.generalResults);

    TweenLite.from(DOMnode, 2.5, {
      width:0, 
      ease: Power4.easeOut
    });
    TweenLite.from(scalegraph, 1, {
      opacity: 0,
      delay: 2,
      x: -20,
      ease: Power2.easeOut
    });
    TweenLite.from(scalegraphController, 1, {
      opacity: 0,
      delay: 2.5,
      x: -20,
      ease: Power2.easeOut
    });        
    TweenLite.from(generalResults, 1, {
      opacity: 0,
      delay: 3,
      y: 20,
      ease: Power2.easeOut
    });     

    this.props.calculate();
    // var that = this;
    // setTimeout(function(){ that.changeGraph('gender', 'female'); }, 10000);



    
  }

  changeGraph(firstProp, secondProp){
    this.setGrey();
    this.setState( (state) => {
      console.log('eerste property ', firstProp)
      console.log('tweede property ', secondProp)
      console.log(this.props.generatedStats);

      var eersteProp = firstProp;
      var tweedeProp = secondProp;


      state.q_1 = this.props.generatedStats[eersteProp][tweedeProp].q_1.total/this.props.generatedStats[eersteProp][tweedeProp].q_1.count;
      state.q_2 = this.props.generatedStats[eersteProp][tweedeProp].q_2.total/this.props.generatedStats[eersteProp][tweedeProp].q_2.count;
      state.q_3 = this.props.generatedStats[eersteProp][tweedeProp].q_3.total/this.props.generatedStats[eersteProp][tweedeProp].q_3.count;
      state.q_4 = this.props.generatedStats[eersteProp][tweedeProp].q_4.total/this.props.generatedStats[eersteProp][tweedeProp].q_4.count;
      state.q_5 = this.props.generatedStats[eersteProp][tweedeProp].q_5.total/this.props.generatedStats[eersteProp][tweedeProp].q_5.count;

      // state.q_1 = Math.round((this.state.stats[firstProp][secondProp].q_1.total/this.state.stats[firstProp][secondProp].q_1.count) * 10) / 10;
      // state.q_2 = Math.round((this.state.stats[firstProp][secondProp].q_2.total/this.state.stats[firstProp][secondProp].q_2.count) * 10) / 10;
      // state.q_3 = Math.round((this.state.stats[firstProp][secondProp].q_3.total/this.state.stats[firstProp][secondProp].q_3.count) * 10) / 10;
      // state.q_4 = Math.round((this.state.stats[firstProp][secondProp].q_4.total/this.state.stats[firstProp][secondProp].q_4.count) * 10) / 10;
      // state.q_5 = Math.round((this.state.stats[firstProp][secondProp].q_5.total/this.state.stats[firstProp][secondProp].q_5.count) * 10) / 10;
      state.active[firstProp] = true;
    })
    console.log(this.state)  
  }

  setGrey(){
    this.setState(function(state){
      state.active.age = false;
      state.active.job = false;
      state.active.education = false;
      state.active.work = false;
      state.active.gender = false;
    })      
  }

  switcher(type){
    console.log('bla');
    this.setState(function(state){
      state.showPersonal = false;
      state.showGeneral = true;
    })   
  }


  render() {
    if(this.state.active.age == true){
      var ageClass = "results__scalegraph--orange"
    } else {
      var ageClass = "";
    }
        if(this.state.active.job == true){
      var jobClass = "results__scalegraph--orange"
    } else {
      var jobClass = "";
    }
        if(this.state.active.education == true){
      var educationClass = "results__scalegraph--orange"
    } else {
      var educationClass = "";
    }
        if(this.state.active.work == true){
      var workClass = "results__scalegraph--orange"
    } else {
      var workClass = "";
    }
        if(this.state.active.gender == true){
      var genderClass = "results__scalegraph--orange"
    } else {
      var genderClass = "";
    }

  		return (
  			<div className="results">
        { this.state.showPersonal ? 

          <div className="results__personal-container">
          
            <Box 
              cName="results__resultbox" 
              h3="Jouw score" top="100" left="150" delayTime="1" speed="1" width="300" height="350"
              p="Ontdek hoe gelukkig jij op de werkvloer bent ten opzichte van andere mannen of vrouwen. Deel je resultaten op Facebook of Twitter en ga met je vrienden het gesprek aan over meetbaar geluk op de werkvloer."
              ownScore={this.props.userScore}
              otherScore="7.0"/>

            <div className="results__scalegraph-container" ref="scalegraph">
              <ScaleGraph
                headline="tevredenheid leven"
                yourScore={this.props.userMultipleScores.q_1}
                averageScore={this.state.q_1}
              />
              <ScaleGraph
                headline="tevredenheid werk"
                yourScore={this.props.userMultipleScores.q_2}
                averageScore={this.state.q_2}
              />  
              <ScaleGraph
                headline="salaris/geluk-ratio"
                yourScore={this.props.userMultipleScores.q_1+this.props.userMultipleScores.q_2/2}
                averageScore={(this.state.q_1+this.state.q_2)/2}
              /> 
              <ScaleGraph
                headline="job crafting"
                yourScore={this.props.userMultipleScores.q_4}
                averageScore={this.state.q_4}
              /> 
              <ScaleGraph
                headline="werkbetekenis"
                yourScore={this.props.userMultipleScores.q_5}
                averageScore={this.state.q_5}
              />                          
            </div> 
          <span className="results__showResults" ref="generalResults" onClick={this.switcher.bind(this, 'off')}>Bekijk algemene resultaten</span>

            <div className="results__scalegraph-controller" ref="scalegraphcontroller">
                <img className="results__scalegraph-controller-arrow" src={whitearrow}/>
                <h2>Jouw scores in vergelijking met anderen op basis van</h2>
                <ul>
                  <li className={ageClass} onClick={this.changeGraph.bind(this, 'age', this.props.userData.userStats.age)}>je leeftijd</li>
                  <li className={jobClass} onClick={this.changeGraph.bind(this, 'job', this.props.userData.userStats.job)}>je beroepssector</li>
                  <li className={educationClass} onClick={this.changeGraph.bind(this, 'education', this.props.userData.userStats.education)}>je opleidingsniveau</li>
                  <li className={workClass} onClick={this.changeGraph.bind(this, 'work', this.props.userData.multipleChoice.work)}>je werkmotivatie</li>
                  <li className={genderClass} onClick={this.changeGraph.bind(this, 'gender', this.props.userData.userStats.gender)}>je geslacht</li>
                </ul>
              </div> 

          </div>   
          : null }

          { this.state.showGeneral ? 
            <div className="results__personal-container">


            <GeneralGraph 
            type="millennials"
            logoWidth="338"
            stats={this.props.generatedStats} // vervangen voor this.props.generatedStats
            delayTime={0}
            text="Volgens Hurst zoeken millennials (1980 - 2000) vaak meer betekenis in hun werk dan vorige generaties. Hieronder zie je of dat bij Tegenlicht-kijkers ook het geval is." /> 



            <GeneralGraph 
            type="mannenvrouwen"
            logoWidth="231"
            stats={this.props.generatedStats} // this.state.stats
            delayTime={.5}
            text="Hoe tevreden zijn mannen over hun werk in vergelijking met vrouwen?" /> 


            <GeneralGraph 
            type="salaristevredenheid"
            logoWidth="325"
            stats={this.props.generatedStats} // this.props.generatedStats
            delayTime={1}
            text="Hoe verhoudt salaris tot werktevredeneheid?" />    

            </div> : null }       


          { /* <Box 
            cName="results__layart" 
            h4="Het maakt na de eerste $70 000 voor je geluksgevoel niet meer uit hoeveel je extra verdient"
            p="Onder de Tegenlicht-kijkers lijkt dat inderdaad het geval te zijn. Mensen die meer dan E5800 p/m verdienen gaven hun leven gemiddeld een 7.6, terwijl mensen die daaronder zaten hun leven een 7.5 gaven"
            top="250" left="450" delayTime="1.6" speed="1" width="300" height="350"/> */ }


  			</div>
  		)
		}
}
export default Results;