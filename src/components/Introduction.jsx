import React from 'react';
import Rebase from 're-base';

/* Components */
import IntegerMeasure from './IntegerMeasure.jsx';
import SpriteAnimator from './interface/Sprite.jsx';

/* Data */
import Model from './config/model.json';
import Innersettings from './config/innersettings.json';
import Questionnaire from './config/questions.json';

import logo from '../assets/images/logo.svg';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');
const width = window.innerWidth;

/* Hier vermoedelijk een if else maken */

class Introduction extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userId: Math.floor(Date.now()),
      boxWidth: 300,
      widthCompensator: 0,
      userData: Model
    }
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

  componentWillMount(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
    // Have to make sure that is only invoked once
    // this.determineBoxWidth();

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

  render() {
  		return (
  			<div className="questions">

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

     {/*    <div className="introduction">
        <img className="introduction__logo" src={logo}/>
          <h1 className="introduction__tagline">Geluksmeter</h1>
          <p className="introduction__text">Geluk kent een veelvoud aan betekenissen. De Franse intellectueel Marcel Proust vond zijn geluk vooral in anderen, terwijl de schrijver Honoré de Balzac zijn geluk vooral in het tonen van lef en hard werken vond. Als we Coca-Cola moeten geloven dan zou zelfs het openen van een blikje Cola ons met geluk doen vervullen.<br/><br/> Ook verschillende gouvernmentale organisaties houden zich tegenwoordig intensief bezig met geluk en het meten daarvan. In 2011 stelde de OESO (Organisatie voor economische samenwerking en ontwikkeling) een 255-pagina tellend rapport op met daarin een aantal best practices omtrent het meten van geluk. Deze geluksmeter bouwt daarop voort en laat zien wat geluk voor jou en voor anderen betekend.</p>
        </div>

      <div className="questions__summary" >
        <h4 className="questions__heading">Start</h4>
        <p className="questions__summarytext">Vul hier al je shit in</p>
      </div> */ }

      <IntegerMeasure 
        uid={this.state.userId}
        boxWidth={this.state.boxWidth}
        userData={this.state.userData}
        setHappy={this.setHappiness.bind(this)}
        setAnswer={this.setAnswer.bind(this)}
      />


  			</div>
  		)
		}
}
export default Introduction;