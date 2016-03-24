import React from 'react';


class PersonaSelect extends React.Component{
  handleChange(event){
    console.log(event.target.value);
    this.props.changeFunc(this.props.field, event.target.value);
  }

  render() {
    console.log(this.props.list)
  		return (
  			<div className="persona__select">
          <select name="select" onChange={this.handleChange.bind(this)} value={this.props.value}>

            { this.props.list.job.map(function(elements, key){
              return (
                  <option value={elements.cat} key={key}>{elements.naam}</option> 
                )
             }) }
          </select>

  			</div>
  		)
		}
}
export default PersonaSelect;