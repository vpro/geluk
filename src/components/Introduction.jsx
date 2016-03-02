import React from 'react';
import Rebase from 're-base';

/* Data */
import Model from './config/model.json';

class Introduction extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userData: Model
    }
  }
  componentWillMount(){
    var firebase = Rebase.createClass('https://geluk.firebaseio.com');
    firebase.push('bears', {
      data: this.state.userData
    })
    this.setState(function(state){
      state.userData.age = 10;
    });
  }

  componentDidMount(){
    console.log(this.state);
  }
  render() {
  		return (
  			<div>
  				<h1>Geluksmeter</h1>
          <p>Bladiebladiebla</p>
          <span>Klik hier om te beginnen</span>
  			</div>
  		)
		}
}
export default Introduction;