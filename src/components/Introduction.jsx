import React from 'react';
import Rebase from 're-base';

/* Components */
import IntegerMeasure from './IntegerMeasure.jsx';
import SpriteAnimator from './interface/Sprite.jsx';
import Results from './Results.jsx';

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
const aantalVragen = 9;

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
      introduction: false,
      persona: false,
      persona_gender: false,
      persona_job: false,
      persona_income: false,
      persona_age: false,
      persona_education: false,
      questions: false,
      results: true
    }
  }

  componentWillMount(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
    // Have to make sure that is only invoked once
    // this.determineBoxWidth();
    console.log(this.props.route);
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

  determineBoxWidth(){
    /*
     *  Keep smartphone width as the width for one box
     *  Perfect width would be around 300px. Which is also doable for iphone
     */

    this.setState(function(state){
      if(width < 468) {
        // iPhone width
        state.boxWidth = width;
      } else {
        // Make sure to update css widths
        state.boxWidth = 300;
      }
    })
  }  

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

    if(hasWhiteSpace(answer) === true){
      this.updateFirebaseAnswer(currentModule, typeOfHappiness, amountOfHappiness, answer);
    }
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
      console.log('whooptiedoo');
      setTimeout(function(){ 
        that.goNext('questions', 'results');
       }, 1500);
    }
  }

  goNext(thisScreen, nextScreen){
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

        { /* <SpriteAnimator
            sprite='http://blaiprat.github.io/jquery.animateSprite/img/scottpilgrim_multiple.png'
            width={100}
            height={100}
          /> */ }

        { /** Introductieblok (maandag af)
            *   ...
            * Vervolgens persoonsgegevensblok (later)
            *   @ Leeftijd
            *   @ Gender (combi?)
            *   @ ...
            * Eerste invulmodule (afwerken)
            * True/false module (maandag af)
            *   @ VPRO-lid (boolean)
            *   @ Getrouwd (boolean)
            *   @ Lid van de gids? (boolean)
            */
        }

       { this.state.introduction ? <div className="intro">
        <span className="intro__tagline">vpro<span className="intro__orange">tegen</span>licht <span className="intro__gray">het rendement van geluk</span></span>
        <h1 className="intro__kop">De betekenis<br />van werk</h1>
        <p className="intro__text">Waar werk lange tijd vooral een manier was om de kost te verdienen, begint onze reden om te werken steeds meer te verschuiven. Onze toenemende welvaart zorgt ervoor dat geld niet uitsluitend meer onze primaire drijfveer is. Werk wordt steeds vaker een manier van zelfexpressie. Een manier om jezelf te ontwikkelen, maar bovenal ook een manier om goed te doen voor onze wereld.</p>
          <video autoPlay className="intro__video" ref="videoElement" loop src="fabriek.mp4"></video>
        <span className="intro__button" onClick={this.goNext.bind(this, 'introduction','persona_gender')}>Start</span>
        </div> : null }

        { this.state.persona_gender ? <PersonaSelect
          value={this.state.userData.userStats.gender}
          question="man of vrouw?"
          list={this.state.personaQuestions}
          changeFunc={this.submitUserstats.bind(this)}
          next="job"
          field="gender"/>  : null }

        { this.state.persona_job ? <PersonaSelect
          value={this.state.userData.userStats.job}
          changeFunc={this.submitUserstats.bind(this)}
          question="in welke sector ben je werkzaam?"
          list={this.state.personaQuestions}
          next="income"
          field="job"/> : null}  

         { this.state.persona_income ? <PersonaSelect
          value={this.state.userData.userStats.income}
          changeFunc={this.submitUserstats.bind(this)}
          question="wat verdien je per maand (bruto)"          
          list={this.state.personaQuestions}
          field="income"
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


       { this.state.persona ? <div className="intro persona">

  
        <PersonaString
          value={this.state.userData.userStats.age}
          question="leeftijd?"          
          changeFunc={this.submitUserstats.bind(this)}
          field="age"
         />

        <span className="intro__button" onClick={this.goNext.bind(this, 'persona','questions')}>Verder</span>
        </div> : null }


     {/*    <div className="introduction">
        <img className="introduction__logo" src={logo}/>
          <h1 className="introduction__tagline">Geluksmeter</h1>
          <p className="introduction__text">Geluk kent een veelvoud aan betekenissen. De Franse intellectueel Marcel Proust vond zijn geluk vooral in anderen, terwijl de schrijver Honoré de Balzac zijn geluk vooral in het tonen van lef en hard werken vond. Als we Coca-Cola moeten geloven dan zou zelfs het openen van een blikje Cola ons met geluk doen vervullen.<br/><br/> Ook verschillende gouvernmentale organisaties houden zich tegenwoordig intensief bezig met geluk en het meten daarvan. In 2011 stelde de OESO (Organisatie voor economische samenwerking en ontwikkeling) een 255-pagina tellend rapport op met daarin een aantal best practices omtrent het meten van geluk. Deze geluksmeter bouwt daarop voort en laat zien wat geluk voor jou en voor anderen betekend.</p>
        </div>

      <div className="questions__summary" >
        <h4 className="questions__heading">Start</h4>
        <p className="questions__summarytext">Vul hier al je shit in</p>
      </div> */ }

      { this.state.questions ? <IntegerMeasure 
        uid={this.state.userId}
        boxWidth={this.state.boxWidth}
        userData={this.state.userData}
        setHappy={this.setHappiness.bind(this)}
        setAnswer={this.setAnswer.bind(this)}
        setProgress={this.increaseProgress.bind(this)}
      /> : null }

      { this.state.results ? <Results/> : null}


  			</div>
  		)
		}
}
export default Introduction;