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

    if(this.props.inleiding === true){
      var inleidingKop = ReactDOM.findDOMNode(this.refs.inleiding_kop),
          inleidingSelect = ReactDOM.findDOMNode(this.refs.inleiding_select),
          inleidingEen = ReactDOM.findDOMNode(this.refs.inleiding_een),
          inleidingTwee = ReactDOM.findDOMNode(this.refs.inleiding_twee);

      /* Drama ik weet */    
      TweenLite.from(inleidingEen, 1, {
        opacity: 0,
        y: 20,
        ease: Power1.ease
      });
      TweenLite.to(inleidingEen, 1, {
        display: 'none',
        opacity: 0,
        delay: 5,
        ease: Power1.ease
      });
      TweenLite.from(inleidingTwee, 1, {
        display: 'none',
        opacity: 0,
        y: 20,
        delay: 6,
        ease: Power1.ease
      });
      TweenLite.to(inleidingTwee, 1, {
        display: 'none',
        opacity: 0,
        delay: 10,
        ease: Power1.ease
      });
      TweenLite.from(inleidingKop, 1, {
        opacity: 0,
        y: 20,
        delay: 11,
        ease: Power1.ease
      });
      TweenLite.from(inleidingSelect, 1, {
        opacity: 0,
        y: 20,
        delay: 11,
        ease: Power1.ease
      });


    } else {    
      TweenLite.from(node, 1, {
        opacity: 0,
        y: 20,
        ease: Power1.ease
      });
    }


  }

  render() {
  		return (
  			<div className="persona__select">
          { this.props.inleiding ? <span className="persona__inleiding" ref="inleiding_een">Eerst vijf korte vragen over jezelf om jouw geluk op de werkvloer beter te kunnen duiden.</span> : null } 
          { this.props.inleiding ? <span className="persona__inleiding" ref="inleiding_twee">De antwoorden op deze vragen gebruiken we alleen binnen deze test. Zo kun je jezelf vergelijken met anderen.</span> : null } 
          <h2 ref="inleiding_kop">{this.props.question}</h2>
          <select className="persona__customselect" ref="inleiding_select" name="select" onChange={this.handleChange.bind(this)} value={this.props.value}>

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