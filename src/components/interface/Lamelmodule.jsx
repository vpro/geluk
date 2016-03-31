import React from 'react';
import ReactDOM from 'react-dom';

import Lameloverlay from './Lameloverlay.jsx';

class LamelModule extends React.Component{
  constructor(props){
    super(props);
    this.submitHappiness = this.submitHappiness.bind(this);
    this.setRef = this.setRef.bind(this);

    this.state = {
      DOMnode: null,
      showNext: true
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

    this.setState(function(state){
      state.showNext = true;
    })
  }

  submitOverlay(event){
    var currentOverlay = this.props.happinessQuestion;
    this.props.setOverlay(currentOverlay);
  }

  render() {
    if(this.props.currentQuestion < this.props.questionNumber){
      var displayElem = { display: 'none' }
      var blurStyle = "questions__singledescription questions__blur--add";
      var secondBlurStyle = "questions__singlerating questions__blur--add";
    } else {
      var blurStyle = "questions__singledescription questions__blur--remove";
      var secondBlurStyle = "questions__singlerating questions__blur--remove";
    }

    var width = {
      minWidth: this.props.boxWidth + 'px'
    }

		return (
			<div className="questions__single" style={width}>

        { this.props.overlayStatus ? 
          <Lameloverlay 
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
            userData={this.props.userData}
            generatedStats={this.props.generatedStats}
          /> : null }
				<p className={blurStyle}>{this.props.questionDescription}</p>
        <span className={secondBlurStyle}>{this.props.happinessValue}/{this.props.highestScale}</span>

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

        { this.state.showNext ? <span 
          className="questions__next" 
          style={displayElem} 
          onClick={this.submitOverlay.bind(this)}
        >verder</span> : null }
			</div>
		)
	}
}

LamelModule.propTypes = {
  happinessValue: React.PropTypes.number.isRequired,
  happinessQuestion: React.PropTypes.string.isRequired,
  setHappy: React.PropTypes.func.isRequired,
  setOverlay: React.PropTypes.func.isRequired
}

export default LamelModule;
