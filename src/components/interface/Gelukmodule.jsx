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

  setOverlay(){
    console.log('doe jij het?')
    var showOverlay = true;
    this.forceUpdate();
  }

  render() {
    var showOverlay = false;
		return (
			<div className="questions__single">
        <Gelukoverlay display={showOverlay} />
				<p className="questions__singledescription">{this.props.questionDescription}</p>
        <input 
          type="range"
          min={this.props.lowestScale}
          max={this.props.highestScale}
          value={this.props.happinessValue}
          onChange={this.submitHappiness} 
          ref={this.setRef} />
        {this.props.happinessValue}

        <span className="questions__next" onClick={this.setOverlay.bind(this)}>Verder</span>
			</div>
		)
	}
}

Gelukmodule.propTypes = {
  happinessValue: React.PropTypes.number.isRequired,
  happinessQuestion: React.PropTypes.string.isRequired,
  setHappy: React.PropTypes.func.isRequired
}

export default Gelukmodule;