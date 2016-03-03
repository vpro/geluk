import React from 'react';
import InputRange from 'react-input-range';


class Gelukmodule extends React.Component{
  constructor(props){
    super(props);

    this.submitHappiness = this.submitHappiness.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref){
    this.specificHappiness = ref;
  }

  submitHappiness(){
    var happinessValue = this.specificHappiness.value;
    // this.specificHappiness = '';
    console.log(happinessValue);
    console.log('component', this);
    this.props.setHappy(happinessValue, "q_2");
  }
  render() {
    console.log(this.props.currentValue)
		return (
			<div className="gelukmodule">
				<p>Gelukmodule</p>
        {this.props.currentValue}
        <input 
          type="range"
          min={0}
          max={10}
          value={this.props.currentValue}
          onChange={this.submitHappiness} 
          ref={this.setRef}
        />
			</div>
		)
	}
}

Gelukmodule.propTypes = {
  currentValue: React.PropTypes.number.isRequired,
  setHappy: React.PropTypes.func.isRequired
}

export default Gelukmodule;