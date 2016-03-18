import React from 'react';
import Rebase from 're-base';

class App extends React.Component{
	  constructor(props){
    super(props);

    this.state = {
      userId: Math.floor(Date.now()),
      shit: 'bla'
    }
  }



  render() {
  		return (
  			<div className="app-container">
  				{this.props.children}
  			</div>
  		)
		}
}
export default App;