import React from 'react';

class App extends React.Component{
  render() {
  		return (
  			<div className="app-container">
  				<h1>vprotegenlicht</h1>
  				{this.props.children}
  			</div>
  		)
		}
}
export default App;