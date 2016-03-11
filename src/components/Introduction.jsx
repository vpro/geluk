import React from 'react';
import Rebase from 're-base';

/* Components */
import Gelukmodule from './interface/Gelukmodule.jsx';
import Geluksummary from './interface/Geluksummary.jsx';

import Truefalse from './interface/Truefalse.jsx';
import SpriteAnimator from './interface/Sprite.jsx';

/* Data */
import Model from './config/model.json';
import Innersettings from './config/innersettings.json';
import Questionnaire from './config/questions.json';

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
      innerSettings: Innersettings,
      userData: Model,
      questions: Questionnaire
    }
  }

  componentWillMount(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  setHappiness(happiness, type){
    var geluk = happiness,
        typeOfHappiness = type;

    this.setState( function(state){
      state.userData.core_module[typeOfHappiness] = geluk;
    }, this.updateFirebase)
  }

  setOverlay(overlayType){
    this.setState( function(state){
      state.innerSettings.overlays[overlayType] = true;
      state.innerSettings.currentPosition++;
    }, this.setNext)
  }

  setNext(){
     this.setState( function(state){
      state.innerSettings.widthOffset = state.innerSettings.widthOffset - this.state.boxWidth;
      console.log(width);
    })   
  }

  setAnswer(answer, typeOfHappiness, currentModule, amountOfHappiness){
    function hasWhiteSpace(s) {
      return s.indexOf(' ') >= 0;
    }

    /* Kijken of dit eigenlijk nog wel noodzakelijk is */
    this.setState( function(state){
      state.userData.core_module[typeOfHappiness + "_answer"] = answer;
    }, this.updateFirebase)

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
    firebase.post('users/answers/' + happinessModule + '/' + typeOfHappiness + '/' + amountOfHappiness + '/' + this.state.userId, {
      data: {answer: answer, gender: userStats.gender, age: userStats.age}
    })
  }  

  render() {
      var margin = {
        "marginLeft": this.state.innerSettings.widthOffset
      }
  		return (
  			<div className="questions" style={margin}>
        { /* <SpriteAnimator
            sprite='http://blaiprat.github.io/jquery.animateSprite/img/scottpilgrim_multiple.png'
            width={100}
            height={100}
          /> */ }
          <Geluksummary 
            moduleHeadline="eudaimonisch geluk"
            moduleDescription="I propose to treat of Poetry in itself and of its various kinds, noting the essential quality of each; to inquire into the structure of the plot as requisite to a good poem; into the number and nature of the parts of which a poem is composed; and similarly into whatever else falls within the same inquiry. Following, then, the order of nature, let us begin with the principles which come first."
          />
        { this.state.questions.core_module.map((question, key) => { return (
          <Gelukmodule
            module={question.module}
            happinessValue={this.state.userData.core_module[question.name]}
            happinessQuestion={question.name}
            currentQuestion={this.state.innerSettings.currentPosition}
            questionNumber={question.number}
            lowestScale={question.lowest_scale}
            highestScale={question.highest_scale}
            questionDescription={question.question} 
            setHappy={this.setHappiness.bind(this)}
            setOverlay={this.setOverlay.bind(this)}
            setAnswer={this.setAnswer.bind(this)}
            setNext={this.setNext.bind(this)}
            overlayStatus={this.state.innerSettings.overlays[question.name]}
            overlayText={this.state.innerSettings.feedback[question.name]}
            overlayComment={this.state.innerSettings.comment[question.name]}
            overlayAnswer={this.state.userData.core_module[question.name + "_answer"]}
            boxWidth={this.state.boxWidth}
            key={key} 
          />
          );
        })} 

  			</div>
  		)
		}
}
export default Introduction;