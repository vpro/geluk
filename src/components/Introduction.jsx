import React from 'react';
import Rebase from 're-base';

/* Components */
import IntegerMeasure from './IntegerMeasure.jsx';
import Results from './Results.jsx';
import Video from './Video.jsx';

import PersonaString from './interface/PersonaString.jsx';
import PersonaSelect from './interface/PersonaSelect.jsx';

/* Data */
import Model from './config/model.json';
import Innersettings from './config/innersettings.json';
import Questionnaire from './config/questions.json';
import Persona from './config/persona.json';

import logo from '../assets/images/logo.svg';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');
const width = window.innerWidth;
const aantalVragen = 10;

/* Hier vermoedelijk een if else maken */

class Introduction extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userId: Math.floor(Date.now()),
      boxWidth: 300,
      widthCompensator: 0,
      heighty: 0,
      personaQuestions: Persona,
      userData: Model,
      generatedStats: null,
      introduction: false,
      video: true,
      persona_gender: false,
      persona_job: false,
      persona_income: false,
      persona_age: false,
      persona_education: false,
      questions: false,
      results: false
    }
  }

  componentWillMount(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
    // Have to make sure that is only invoked once
    // this.determineBoxWidth();
    console.log(this.props.route);

    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI('http://vpro.github.io/geluk/stats.json'));
    xhr.onload = function() {
      if (xhr.status === 200) {
        that.setState(function(state){
          state.generatedStats = JSON.parse(xhr.responseText);
        }, that.checkState);
      }
      else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  }

  checkState(){
    console.log(this.state);
  }

  submitUserstats(type, reply, next){
    if(next == 'job' || next == 'gender' || next == 'income' || next == 'age' || next == 'education'){
      var next = 'persona_'+next
    }
    this.setState(function(state){
      state.userData.userStats[type] = reply;
    }, this.updateFirebase)
    this.goNext('persona_'+type, next)
    this.increaseProgress();
  }

  // determineBoxWidth(){
  //   /*
  //    *  Keep smartphone width as the width for one box
  //    *  Perfect width would be around 300px. Which is also doable for iphone
  //    */

  //   this.setState(function(state){
  //     if(width < 468) {
  //       // iPhone width
  //       state.boxWidth = width;
  //     } else {
  //       // Make sure to update css widths
  //       state.boxWidth = 300;
  //     }
  //   })
  // }  

  setHappiness(happiness, type){
    var geluk = happiness,
        typeOfHappiness = type;

    this.setState( function(state){
      state.userData.core_module[typeOfHappiness] = geluk;
    }, this.updateFirebase)
  }


  setAnswer(answer, typeOfHappiness, currentModule, amountOfHappiness){
    function hasWhiteSpace(s) {
      return s.indexOf(' ') >= 0;
    }

    if( hasWhiteSpace( answer ) === true ){
      this.updateFirebaseAnswer( currentModule, typeOfHappiness, amountOfHappiness, answer );
    }
  }

  setMultipleChoice( type ){
    this.setState( function(state){
      state.userData.multipleChoice.work = type;
    }, this.updateFirebase)
  }

  calculateScore(){
    var score = ((this.state.userData.core_module.q_1 * 1) + (this.state.userData.core_module.q_2 * 1) + (this.state.userData.core_module.q_1 * 1) + (this.state.userData.core_module.q_3 * 1) + (this.state.userData.core_module.q_4 * .5) +  (this.state.userData.core_module.q_5 * 1))/4.5
    score = Math.round(score * 10) / 10;

    this.setState( function(state){
      state.userData.userStats.score = score;
    }, this.updateFirebase)
  }

  updateFirebase(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  updateFirebaseAnswer(happinessModule, typeOfHappiness, amountOfHappiness, answer){
    var userStats = this.state.userData.userStats;
    firebase.post('answers/' + happinessModule + '/' + typeOfHappiness + '/' + amountOfHappiness + '/' + this.state.userId, {
      data: {answer: answer, gender: userStats.gender, age: userStats.age}
    })
  }

  increaseProgress(){
    this.setState( function(state){
      state.heighty = state.heighty + (100 / aantalVragen);
    })
    var that = this;
    if(this.state.heighty > 85){
      setTimeout(function(){ 
        that.goNext('questions', 'results');
       }, 1500);
    }
  }

  goNext(thisScreen, nextScreen){
    console.log('trigger go next');
    console.log(thisScreen);
    this.setState(function(state){
        state[thisScreen] = false;
        state[nextScreen] = true;
    })
  }  

  render() {
    var height = {
      height: this.state.heighty + '%'
    }
		return (
			<div className="questions">
        <div className="app-container__progress">
          <div className="app-container__progressbar--orange" style={height}></div>
        </div>

      <div className="nosupport"> 
        <p>Deze applicatie ondersteunt geen mobiele telefoons</p>
      </div>


       { this.state.introduction ? <div className="intro">
        <span className="intro__tagline">vpro<span className="intro__orange">tegen</span>licht <span className="intro__gray">het rendement van geluk</span></span>
        <h1 className="intro__kop">De betekenis<br />van werk</h1>
        <p className="intro__text">Ontdek met deze test hoe gelukkig jij bent tijdens je werk. Ben jij gelukkig dan collega's uit dezelfde sector? Ben jij gelukkiger dan anderen die deze test invullen? En hoe meetbaar is jouw arbeidsgeluk eigenlijk? Ontdek het rendement van je geluk.</p>
          <video autoPlay className="intro__video" ref="videoElement" loop src="fabriek.mp4"></video>
        <span className="intro__button" onClick={this.goNext.bind(this, 'introduction','persona_gender')}>Start</span>
        </div> : null }

        { this.state.persona_gender ? <PersonaSelect
          value={this.state.userData.userStats.gender}
          inleiding={true}
          question="man of vrouw?"
          list={this.state.personaQuestions}
          changeFunc={this.submitUserstats.bind(this)}
          next="job"
          field="gender"/>  : null }

        { this.state.persona_job ? <PersonaSelect
          value={this.state.userData.userStats.job}
          changeFunc={this.submitUserstats.bind(this)}
          question="in welke sector werk je?"
          list={this.state.personaQuestions}
          next="income"
          field="job"/> : null}  

         { this.state.persona_income ? <PersonaSelect
          value={this.state.userData.userStats.income}
          changeFunc={this.submitUserstats.bind(this)}
          question="wat is je bruto maandsalaris?"          
          list={this.state.personaQuestions}
          field="income"
          next="age"
         /> : null } 

        { this.state.persona_age ? <PersonaSelect
          value={this.state.userData.userStats.age}
          changeFunc={this.submitUserstats.bind(this)}
          question="hoe oud ben je?"          
          list={this.state.personaQuestions}
          field="age"
          next="education"
         /> : null } 

         { this.state.persona_education ?  <PersonaSelect
          value={this.state.userData.userStats.education}
          question="hoogst genoten onderwijs"          
          changeFunc={this.submitUserstats.bind(this)}
          list={this.state.personaQuestions}
          field="education"
          next="questions"
        />: null } 


       { /* this.state.persona ? <div className="intro persona">

  
        <PersonaString
          value={this.state.userData.userStats.age}
          question="leeftijd?"          
          changeFunc={this.submitUserstats.bind(this)}
          field="age"
         />

        <span className="intro__button" onClick={this.goNext.bind(this, 'persona','questions')}>Verder</span>
        </div> : null */ }

      { this.state.video ? <Video 
        setMultipleChoice={this.setMultipleChoice.bind(this)}
        goNext={this.goNext.bind(this)} /> : null
        }

      { this.state.questions ? <IntegerMeasure 
        uid={this.state.userId}
        boxWidth={this.state.boxWidth}
        userData={this.state.userData}
        setHappy={this.setHappiness.bind(this)}
        setAnswer={this.setAnswer.bind(this)}
        setProgress={this.increaseProgress.bind(this)}
        userData={this.state.userData}
        // setMultipleChoice={this.setMultipleChoice.bind(this)}
        generatedStats={this.state.generatedStats}
      /> : null }

      { this.state.results ? <Results
        calculate={this.calculateScore.bind(this)}
        userScore={this.state.userData.userStats.score}
        userMultipleScores={this.state.userData.core_module}
        userData={this.state.userData}
        generatedStats={this.state.generatedStats}
        /> : null}


  			</div>
  		)
		}
}
export default Introduction;
