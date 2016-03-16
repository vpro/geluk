import React from 'react';
import Rebase from 're-base';


class Comment extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			word: false
		}
	}

	changeString(event){
		const {currentQuestion, currentModule, currentHappiness} = this.props;
		var message = event.target.value;

		this.setState(function(state){state.word = true});
		this.props.setAnswer(message, currentQuestion, currentModule, currentHappiness);
	}

	submitComment(event){
    if(event.keyCode == 13){
			this.props.submitCommentOverlay();
			this.props.setShowMessage(true);
    }
	}

	submitCommentClick(event){
  	this.props.submitCommentOverlay();
		this.props.setShowMessage(true);
	}

  render() {
  	var placeholder = "Ik gaf mijzelf een " + this.props.happinessValue + " omdat ik...",
  			enterElem;

  	if(this.state.word){
  		enterElem = (<p className="commentbox__entermessage">of druk enter</p>)
  	}

		return (
			<div className="commentbox">
        <input type="text" 
        	className="commentbox__input"
        	value={this.props.comment} 
        	maxLength="140"
        	placeholder={placeholder}
        	onChange={this.changeString.bind(this)}
        	onKeyUp={this.submitComment.bind(this)}
        />
       	 <br/>
        <div className="commentbox__container">
        <span className="commentbox__next--white" onClick={this.submitCommentClick.bind(this)}>verder</span>
        {enterElem}
        </div>
			</div>
		)
	}
}

Comment.propTypes = {
	submitCommentOverlay: React.PropTypes.func.isRequired,
	setShowMessage: React.PropTypes.func.isRequired,
	comment: React.PropTypes.string.isRequired,
	currentQuestion: React.PropTypes.string.isRequired
}

export default Comment;