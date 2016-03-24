import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';


class PersonaSelect extends React.Component{
  handleChange(event){
    console.log(event.target.value);
    this.props.changeFunc(this.props.field, event.target.value, this.props.next);
  }

  componentDidMount(){
    var node = ReactDOM.findDOMNode(this);

    TweenLite.from(node, 1, {
      opacity: 0,
      y: 20,
      ease: Power1.ease
    });


  }

  render() {
  		return (
  			<div className="persona__select">
          <h2>{this.props.question}</h2>
          <select className="persona__customselect" name="select" onChange={this.handleChange.bind(this)} value={this.props.value}>

            { this.props.list[this.props.field].map(function(elements, key){
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