import React from 'react';
import Rebase from 're-base';

/* Components */
import Gelukmodule from './interface/Gelukmodule.jsx';

/* Data */
import Model from './config/model.json';
import Questionnaire from './config/questions.json';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');

class Introduction extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userId: Math.floor(Date.now()),
      userData: Model,
      questions: Questionnaire
    }
  }

  componentWillMount(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  setHappiness(happiness, type){
    var geluk = happiness,
        typeOfHappiness = type;

    this.setState( function(state){
      state.userData.core_module[typeOfHappiness] = geluk;
    }, this.updateFirebase)
  }

  updateFirebase(){
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  render() {
  		return (
  			<div className="questions">
        { this.state.questions.core_module.map((question, key) => { return (
          <Gelukmodule
            happinessValue={this.state.userData.core_module[question.name]}
            happinessQuestion={question.name}
            lowestScale={question.lowest_scale}
            highestScale={question.highest_scale}
            questionDescription={question.question} 
            setHappy={this.setHappiness.bind(this)}
            key={key} 
          />
          );
        })} 

  			</div>
  		)
		}
}
export default Introduction;