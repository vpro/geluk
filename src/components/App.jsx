import React from 'react';
import Rebase from 're-base';



class App extends React.Component{
	  constructor(props){
    super(props);
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