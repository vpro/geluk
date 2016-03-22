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
      showVideo: true
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

          {this.state.showVideo ? <VideoQuestion
          closeVideo={this.closeVideo.bind(this)}
         /> : null }

          <LamelSummary 
            moduleHeadline="eudaimonisch geluk"
            moduleDescription="I propose to treat of Poetry in itself and of its various kinds, noting the essential quality of each; to inquire into the structure of the plot as requisite to a good poem; into the number and nature of the parts of which a poem is composed; and similarly into whatever else falls within the same inquiry. Following, then, the order of nature, let us begin with the principles which come first."
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
                boxWidth={this.props.boxWidth}
                key={key} />
              );
            })
        } 

  			</div>
  		)
		}
}
export default IntegerMeasure;