import React from 'react';
import GSAP from 'gsap';
import Rebase from 're-base';

import lodash from 'lodash';
import SingleMessage from './Geluksinglemessage.jsx';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');

class Allmessages extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    	lowestAnswer: null,
    	lowestNumber: null,
    	lowestGender: null,
    	lowestAge: null,
    	highestNumber: null,
    	highestAnswer: null,
    	highestGender: null,
    	highestAge: null
    }
  }

	componentWillMount(){
		console.log(this.props.module);
		console.log(this.props.currentQuestion);

    firebase.fetch('answers/' + this.props.module + '/' + this.props.currentQuestion, {
      context: this,
      asArray: true,
      then(data){
        this.setState(function(state){
        	var length = data.length-1;
        	var lowest = _.values(data[0]);
        	var highest = _.values(data[length]);
        	state.lowestNumber = data[0].key;
        	state.highestNumber = data[length].key;

        	var randomLowest = Math.floor(lowest.length * Math.random());
        	var randomHighest = Math.floor(highest.length * Math.random());
        	state.lowestAnswer = lowest[randomLowest].answer;
        	state.lowestAge = lowest[randomLowest].age;
        	state.lowestGender = lowest[randomLowest].gender;
        	state.highestAnswer = highest[randomHighest].answer;
        	state.highestAge = highest[randomHighest].age;
        	state.highestGender = highest[randomHighest].gender;
        });
      }
    }); 
	}

	/* Dit is voor later */
	generateNewRandomAnswer(){
		console.log('bla');
	}

  render() {
		return (
			<div className="messages">
				<div>
				<p>Ok&#233;, geen probleem. Dit is wat andere mensen achterlieten:</p>
				{ ['lowest','highest'].map( (elements, key) => { return (
				 <SingleMessage
						gender={this.state[elements + "Gender"]}
						age={this.state[elements + "Age"]}
						answer={this.state[elements + "Answer"]}
						number={this.state[elements + "Number"]}
						key={key}
						/> 
					) }
				) }

				</div>

			</div>
		)
	}
}

Allmessages.propTypes = {

}

export default Allmessages;