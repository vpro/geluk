import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

class SimilarComment extends React.Component{

	componentDidMount(){

		var duur = 8;

    var loader = ReactDOM.findDOMNode(this.refs.loader);
    var profile = ReactDOM.findDOMNode(this.refs.profile);
    var message = ReactDOM.findDOMNode(this.refs.message);

		TweenLite.to(loader, duur, {
      minWidth: '100%',
      delay: .5,
      display: 'block',
      ease: Power0.ease
    });

    [profile, message].map(function(elements){
    	return TweenLite.to(elements, duur - 1, {
	    	y: -20,
	      delay: .5,
	      opacity: 1,
	      display: 'block',
	      ease: Power1.ease
	    });
    });

    [profile, message].map(function(elements){
    	return TweenLite.to(elements, 1, {
    		delay: duur - 1,
	      opacity: 0,
	      display: 'block',
	      ease: Power1.ease
	    });
    });

    setTimeout(
    	function(){ 
    		this.props.setShowMessage(false); 
    	}.bind(this), duur * 1000);
	}

  render() {
  	const {age, rating} = this.props;

  	if(this.props.gender === 'male'){
  		var gender = 'man';
  	} else {
  		var gender = 'vrouw';
  	}

  	if (this.props.comment) {
  		var comment = this.props.comment;
  	} else {
  		var comment = "Want ik ben zeer gelukkig"
  	}

  	/* Oplossing zoeken wat er moet gebeuren wanneer er een undefined is */

		return (
			<div className="message">
				<div className="message__loader" ref="loader"></div>
				<div className="message__container">
					<p className="message__profile" ref="profile">iemand anders gaf zichzelf ook een {rating} omdat:</p>
					<p className="message__message" ref="message">{comment}</p>
				</div>
			</div>
		)
	}
}

SimilarComment.propTypes = {
	setShowMessage: React.PropTypes.func.isRequired,
	comment: React.PropTypes.string
}

export default SimilarComment;