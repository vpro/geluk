import React from 'react';
import GSAP from 'gsap';

class SimilarComment extends React.Component{
	componentDidMount(){
		const {loader, profile, message} = this.refs;
		var duur = 8;

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
  	const {age, rating, comment} = this.props;

  	if(this.props.gender === 'male'){
  		var gender = 'man';
  	} else {
  		var gender = 'vrouw';
  	}

  	/* Oplossing zoeken wat er moet gebeuren wanneer er een undefined is */
  	if(typeof this.props.age == 'undefined'){
  		console.log('geen comment');
  	}

		return (
			<div className="message">
				<div className="message__loader" ref="loader"></div>
				<div className="message__container">
					<p className="message__profile" ref="profile">een {age}-jarige {gender} gaf zichzelf ook een {rating} omdat:</p>
					<p className="message__message" ref="message">{comment}</p>
				</div>
			</div>
		)
	}
}

SimilarComment.propTypes = {
	setShowMessage: React.PropTypes.func.isRequired,
	age: React.PropTypes.any.isRequired,
	gender: React.PropTypes.string.isRequired,
	comment: React.PropTypes.string.isRequired
}

export default SimilarComment;