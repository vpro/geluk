import React from 'react';

class SingleMessage extends React.Component{
  render() {
    if(this.props.gender === 'male'){
      var gender = 'man';
    } else {
      var gender = 'vrouw';
    }
		return (
			<div className="singlemessage">
					<p>Een {this.props.age}-jarige {gender} gaf zichzelf een {this.props.number}</p>
          <p>{this.props.answer}</p>
			</div>
		)
	}
}

SingleMessage.propTypes = {
  gender: React.PropTypes.string,
  age: React.PropTypes.number,
  answer: React.PropTypes.string,
  number: React.PropTypes.number
}

export default SingleMessage;