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
    this.props.goNext('video','persona_gender');
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
  			<div className="questions">

          {this.state.showVideo ? <VideoQuestion
          closeVideo={this.closeVideo.bind(this)}
          setMultipleChoice={this.props.setMultipleChoice.bind(this)}
         /> : null }

  			</div>
  		)
		}
}
export default IntegerMeasure;
