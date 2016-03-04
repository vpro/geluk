import React from 'react';
import Gelukoverlay from './Gelukoverlay.jsx';

class Gelukmodule extends React.Component{
  constructor(props){
    super(props);
    this.submitHappiness = this.submitHappiness.bind(this);
    this.setRef = this.setRef.bind(this);
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
        backgroundColor: 'pink',
        textShadow: '0 0 12px white',
        color: 'transparent'
      }
    } 

		return (
			<div className="questions__single" style={style}>
        <Gelukoverlay display={this.props.overlayStatus} text={this.props.overlayText} />
				<p className="questions__singledescription" style={style}>{this.props.questionDescription}</p>
        <input 
          type="range"
          min={this.props.lowestScale}
          max={this.props.highestScale}
          value={this.props.happinessValue}
          onChange={this.submitHappiness} 
          ref={this.setRef} />
        {this.props.happinessValue}

        <span className="questions__next" onClick={this.submitOverlay.bind(this)}>Verder</span>
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