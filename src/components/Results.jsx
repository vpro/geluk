import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';



/* Components */


/* Hier vermoedelijk een if else maken */

class Results extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);

    console.log(DOMnode);

    TweenLite.from(DOMnode, .5, {
      width:0, 
      delay:1,
      ease: Power2.easeOut
    });
  }


  render() {

  		return (
  			<div className="results">
          <h1>Resultaten</h1>
  			</div>
  		)
		}
}
export default Results;