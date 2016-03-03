import React from 'react';
import Rebase from 're-base';

/* Components */
import Gelukmodule from './interface/Gelukmodule.jsx';

/* Data */
import Model from './config/model.json';

// const firebase = Rebase.createClass('https://geluk.firebaseio.com');


class Introduction extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userId: Math.floor(Date.now()),
      userData: Model
    }
  }

  componentWillMount(){
    var firebase = Rebase.createClass('https://geluk.firebaseio.com');
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  componentDidMount(){
    console.log(this.state);
  }



  setHappiness(happiness, type){
    var geluk = happiness;
    var gelukstype = type;
    console.log("parent", this)

    this.setState( function(state){
      state.userData.core_module[gelukstype] = geluk;
    }, this.updateFirebase)
  }

  updateFirebase(){
    var firebase = Rebase.createClass('https://geluk.firebaseio.com');
    firebase.post('users/'+ this.state.userId, {
      data: this.state.userData
    })
  }

  render() {
  		return (
  			<div>
          <Gelukmodule 
            currentValue={this.state.userData.core_module.q_2} 
            setHappy={this.setHappiness.bind(this)} 
          />
        {    // <input 
            //   type="range"
            //   min={0}
            //   max={10}
            //   value={this.state.userData.age}
            //   onChange={this.setHappiness.bind(this, "q_1")} 
            // />
          }
            {this.state.userData.age}
  			</div>
  		)
		}
}
export default Introduction;