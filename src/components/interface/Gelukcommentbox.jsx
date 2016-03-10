import React from 'react';

class Commentbox extends React.Component{
	submitString(event){
		var message = event.target.value,
				currentQuestion = this.props.currentQuestion;
		console.log(message, currentQuestion);

		this.props.setAnswer(message, currentQuestion)
	}
  render() {
		return (
			<div>
        <input type="text" 
        	value={this.props.comment} 
        	onChange={this.submitString.bind(this)}
        />
			</div>
		)
	}
}

Commentbox.propTypes = {

}

export default Commentbox;