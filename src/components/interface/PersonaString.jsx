import React from 'react';

class PersonaString extends React.Component{
  constructor(props){
    super(props);
  }

  handleChange(event){
    console.log(event.target.value);
    this.props.changeFunc(this.props.field, event.target.value);
  }

  render() {
  		return (
  			<div className="persona__string">

          <input
            type="text"
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
          />

  			</div>
  		)
		}
}
export default PersonaString;