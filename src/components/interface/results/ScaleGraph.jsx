import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';




class ScaleGraph extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var ownCircle = ReactDOM.findDOMNode(this.refs.owncircle);
    var averageCircle = ReactDOM.findDOMNode(this.refs.averagecircle);


    TweenLite.from(ownCircle, 1, {
      marginLeft:0, 
      ease: Power4.easeOut
    });
    TweenLite.from(averageCircle, 1, {
      marginLeft:0, 
      ease: Power4.easeOut
    });
  
  }

  render() {
    var positionOwnCircle = {
      marginLeft: (177/10)*this.props.yourScore - 15
    }

    var positionAverageCircle = {
      marginLeft: (177/10)*this.props.averageScore - 15
    }

  		return (
  			<div className="results__scale-graph">
          <h6>{this.props.headline}</h6>
          <div className="results__scale-circle results__scale-yours" style={positionOwnCircle} ref="owncircle">{this.props.yourScore}</div>
          <div className="results__scale-circle results__scale-others" style={positionAverageCircle} ref="averagecircle">{this.props.averageScore}</div>
          <div className="results__scale"/>
        </div>
  		)
		}
}
export default ScaleGraph;