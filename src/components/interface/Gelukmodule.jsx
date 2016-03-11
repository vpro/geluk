import React from 'react';
import ReactDOM from 'react-dom';

import Gelukoverlay from './Gelukoverlay.jsx';

class Gelukmodule extends React.Component{
  constructor(props){
    super(props);
    this.submitHappiness = this.submitHappiness.bind(this);
    this.setRef = this.setRef.bind(this);

    this.state = {
      DOMnode: null
    }
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
    this.setState(function(state){
      state.DOMnode = DOMnode;
    })
  }

  setRef(ref){
    this.refHappiness = ref;
  }

  submitHappiness(){
    var currentQuestion = this.props.happinessQuestion,
        givenHappiness = Number(this.refHappiness.value);

    this.props.setHappy(givenHappiness, currentQuestion);
  }

  submitOverlay(event){
    var currentOverlay = this.props.happinessQuestion;
    this.props.setOverlay(currentOverlay);
  }


  render() {
    if(this.props.currentQuestion < this.props.questionNumber){
      var style = {
        textShadow: '0 0 12px black',
        color: 'transparent'
      }
      var displayElem = {
        display: 'none'
      }
    } 

		return (
			<div className="questions__single" style={style}>

        { this.props.overlayStatus ? 
          <Gelukoverlay 
            module={this.props.module}
            moduleDOM={this.state.DOMnode}
            text={this.props.overlayText} 
            happinessValue={this.props.happinessValue}
            showComment={this.props.overlayComment}
            setAnswer={this.props.setAnswer.bind(this)}
            setNext={this.props.setNext.bind(this)}
            currentQuestion={this.props.happinessQuestion}
            comment={this.props.overlayAnswer} 
            boxWidth={this.props.boxWidth}
          /> : null }

				<p className="questions__singledescription" style={style}>{this.props.questionDescription}</p>
        <span className="questions__singlerating">{this.props.happinessValue}/{this.props.highestScale}</span>

          <br/>
        <input 
          type="range"
          min={this.props.lowestScale}
          max={this.props.highestScale}
          value={this.props.happinessValue}
          onChange={this.submitHappiness} 
          ref={this.setRef}
          style={displayElem} 
        />
        <span 
          className="questions__next" 
          style={displayElem} 
          onClick={this.submitOverlay.bind(this)}
        >verder</span>
			</div>
		)
	}
}

Gelukmodule.propTypes = {
  happinessValue: React.PropTypes.number.isRequired,
  happinessQuestion: React.PropTypes.string.isRequired,
  setHappy: React.PropTypes.func.isRequired,
  setOverlay: React.PropTypes.func.isRequired
}

export default Gelukmodule;