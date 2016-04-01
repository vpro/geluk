import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';

/* Components */
import LamelModule from './interface/Lamelmodule.jsx';
import LamelSummary from './interface/Lamelsummary.jsx';

import VideoFS from './interface/video/VideoFS.jsx';
import VideoQuestion from './interface/video/VideoQuestion.jsx';


/* Data */
import Model from './config/model.json';
import Innersettings from './config/innersettings.json';
import Questionnaire from './config/questions.json';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');
const width = window.innerWidth;

/* Hier vermoedelijk een if else maken */

class IntegerMeasure extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      widthCompensator: 0,
      innerSettings: Innersettings,
      questions: Questionnaire,
      showVideo: false
    }
  }

  closeVideo(){
    this.setState(function(state){
      state.showVideo = false;
    })
  }

  setOverlay(overlayType){
    this.setState( function(state){
      state.innerSettings.overlays[overlayType] = true;
      state.innerSettings.currentPosition++;
    }, this.setNext)
  }

  setNext(){
    this.setState( function(state){
      state.innerSettings.widthOffset = state.innerSettings.widthOffset - this.props.boxWidth;
      console.log(width);
    })   
    // Increase height
    this.props.setProgress();
  }

  render() {
      var margin = {
        "marginLeft": this.state.innerSettings.widthOffset
      }
  		return (
  			<div className="questions" style={margin}>

         { /* this.state.showVideo ? <VideoFS 
          closeVideo={this.closeVideo.bind(this)}
         /> : null */}

          { /* this.state.showVideo ? <VideoQuestion
          closeVideo={this.closeVideo.bind(this)}
          setMultipleChoice={this.props.setMultipleChoice.bind(this)}
         /> : null  */}

          <LamelSummary 
            moduleHeadline="meetbaar geluk"
            moduleDescription="Geef een score van 1 tot 10 op de volgende vragen om je geluk op de werkvloer te bepalen. We vergelijken je score met andere deelnemers aan deze test en vragen je om een reactie. Hoe meetbaar is geluk?"
          />

        { this.state.questions.core_module.map((question, key) => { 
            return (
              <LamelModule
                module={question.module}
                happinessValue={this.props.userData.core_module[question.name]}
                happinessQuestion={question.name}
                currentQuestion={this.state.innerSettings.currentPosition}
                questionNumber={question.number}
                lowestScale={question.lowest_scale}
                highestScale={question.highest_scale}
                questionDescription={question.question} 
                setHappy={this.props.setHappy}
                setOverlay={this.setOverlay.bind(this)}
                setAnswer={this.props.setAnswer}
                setNext={this.setNext.bind(this)}
                overlayStatus={this.state.innerSettings.overlays[question.name]}
                overlayText={this.state.innerSettings.feedback[question.name]}
                overlayComment={this.state.innerSettings.comment[question.name]}
                overlayAnswer={this.props.userData.core_module[question.name + "_answer"]}
                userData={this.props.userData}
                boxWidth={this.props.boxWidth}
                generatedStats={this.props.generatedStats}
                key={key} />
              );
            })
        } 

  			</div>
  		)
		}
}
export default IntegerMeasure;
