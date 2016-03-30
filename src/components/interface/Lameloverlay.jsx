// import GSAP from 'react-gsap-enhancer'
import React from 'react';
import GSAP from 'gsap';
import ReactDOM from 'react-dom';

import Rebase from 're-base';

import InputComment from './comment/Lamelinput.jsx';
import SimilarComment from './comment/Lamelmessage.jsx';
import Allmessages from './comment/Gelukallmessages.jsx';

const firebase = Rebase.createClass('https://geluk.firebaseio.com');

class Lameloverlay extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showMessage: false,
      showAllMessages: false,
      stats : null,
      posts: null
    }
  }

  componentDidMount(){
    var node = ReactDOM.findDOMNode(this);
    var buttons = this.refs.overlaybuttons;
    var text = this.refs.text;

    TweenLite.from(node, .4, {
      width: 0,
      padding: 0,
      display: 'block',
      ease: Power1.ease
    });

    TweenLite.from(text, .4, {
      y: 20,
      delay: .4,
      ease: Power1.ease,
      display: 'none'
    });

    if (this.props.text === "comment") {
      TweenLite.to(buttons, .4, {
        y: -20,
        delay: .4,
        ease: Power1.ease,
        display: 'block'
      });
      /* Fetch posts */
      firebase.fetch('answers/' + this.props.module + '/' + this.props.currentQuestion + '/' + this.props.happinessValue, {
        context: this,
        asArray: true,
        then(data){
          console.log(data);
          if(data == []) {
            this.setState(function(state){
              state.display = false;
            });
          } else {
            this.setState(function(state){
              state.posts = data;
              state.chosenPost = Math.floor(data.length*Math.random());
            });
          }
        }
      }); 
    }
  }

  showBox(event){
    var parentNode = this.props.moduleDOM,
        thisNode = ReactDOM.findDOMNode(this),
        text = this.refs.text,
        buttons = this.refs.overlaybuttons,
        comment = ReactDOM.findDOMNode(this.refs.comment),
        fullWidth = window.innerWidth;

    [parentNode, thisNode].map(function(elements){
      return TweenLite.to(elements, .4, {
        minWidth: fullWidth,
        delay: .5,
        display: 'block',
        ease: Power1.ease
      });
     });        
    [text, buttons].map(function(elements){
      return TweenLite.to(elements, .4, {
        opacity: 0,
        y: 20,
        display: 'none',
        ease: Power1.ease
      });
     });

    TweenLite.to(comment, 1, {
      width: 0,
      padding: 0,
      delay: 1,
      y: -20,
      display: 'block',
      ease: Power1.ease
    })
  }

  resetWidth(){
    var parentNode = this.props.moduleDOM,
        thisNode = ReactDOM.findDOMNode(this),
        boxWidth = this.props.boxWidth;

    [parentNode, thisNode].map(function(elements){
      return TweenLite.to(elements, 1, {
        minWidth: boxWidth,
        display: 'block',
        ease: Power1.ease
      });
     });    

  }

  submitNext(event){
    this.props.setNext();
  }

  submitComment(event){
    var comment = ReactDOM.findDOMNode(this.refs.comment);
    TweenLite.to(comment, .3, {
      width: 0,
      padding: 0,
      delay: .2,
      y: 20,
      display: "none",
      opacity: 0,
      ease: Power1.ease
    })
  }

  setShowMessage(switcher){
    var switcher = switcher;
    this.setState(function(state){
      state.showMessage = switcher;
      if(switcher === true){
        setTimeout(function(){
        state.showAllMessages = true;
      }, 8000)
      }
    })
    if(switcher === false){
      this.resetWidth();
    }
  }

  genFeedback(stat, val, q) {
      //console.log("genFeedback:", stat, val, q);
      switch ( q ) {
          case 1:
              var avg = stat.total/stat.count;
              var percentage = Math.round(((100/avg) * val)-100);
              var hoogte = percentage > 0 ? "boven" : "onder";
              if ( percentage == 0 ) {
                  return "Je antwoord is gelijk aan het gemiddelde";
              }
              return "Je antwoord ligt "+ Math.abs(percentage) + "% "+hoogte+" het gemiddelde.";
          case 3:
              var start = "Mensen worden volgens Hurst naar gelang hun carrière vaak steeds ontevredener over hun werk";
              var prevVal = this.props.userData.core_module.q_2
              if ( q > prevVal ) {
                  return start + "<br /><br /> Blijkbaar is dit bij jou ook het geval";
              } else {
                  return start + "<br /><br /> Blijkbaar is dit bij jou niet het geval"
              }
          case 4:
              var avg = stat.total/stat.count;
              var percentage = Math.round(((100/avg) * val)-100);
              var hoogte = percentage > 0 ? "meer" : "minder";
              if ( percentage == 0 ) {
                  return "Je voelt je even vrij als anderen in jouw leeftijds categorie";
              }
              return "Je voelt je " + Math.abs(percentage) + "% " + hoogte
                    + " vrij dan anderen in jouw leeftijds categorie.";
          case 5:
              var avg = stat.total/stat.count;
              return "Mensen met jouw opleidings niveau geven gemiddeld een "
                    + Math.round(avg*10)/10 + " aan de betekenis van hun werk."; 
      }
  }
  
  render() {
    if (this.props.text === "comment"){
      var cijfer = this.props.happinessValue,
          tekst = "Wil je vertellen waarom je jezelf een " + cijfer + " gaf?",
          showButtons = true;
    } else if ( this.props.text === "answer1" ) {
          var tekst = this.genFeedback(this.props.generatedStats.all.q_1, this.props.happinessValue, 1);//genereer obv stats
    } else if ( this.props.text === "answer3" ) {
          var tekst = this.genFeedback(this.props.generatedStats.all.q_3, this.props.happinessValue, 3);//genereer obv stats
    } else if ( this.props.text === "answer4" ) {
          //console.log(this.props.userData.userStats, this.state.stats);
          // get right stats object or all
          var stat = this.props.userData.userStats.age == "geen" ? this.props.generatedStats.all.q_4 : this.props.generatedStats.age[ this.props.userData.userStats.age ].q_4;
          var tekst = this.genFeedback(stat, this.props.happinessValue, 4);//genereer obv stats
    } else if ( this.props.text === "answer5" ) {
          // get right stats object or all
          var stat = this.props.userData.userStats.education == "geen" ? this.props.generatedStats.all.q_5 : this.props.generatedStats.education[ this.props.userData.userStats.education ].q_5;
          var tekst = this.genFeedback(stat, this.props.happinessValue, 5);//genereer obv stats
    } else {
      var tekst = this.props.text;
    }
    var chosenPost = this.state.chosenPost;

		return (
			<div className="questions__overlay">
				<p className="questions__overlaytext" ref="text" dangerouslySetInnerHTML={{__html: tekst}}></p>

        { showButtons ? 
          <div className="questions__overlaybuttons" ref="overlaybuttons">
            <span className="questions__next--yellow" onClick={this.submitNext.bind(this)}>Liever niet</span>
            <span className="questions__next--yellow" onClick={this.showBox.bind(this)}>Ja</span>
          </div> : null }
        
        { this.props.showComment ? 
          <InputComment 
            comment={this.props.comment} 
            submitCommentOverlay={this.submitComment.bind(this)}
            setAnswer={this.props.setAnswer.bind(this)}
            setShowMessage={this.setShowMessage.bind(this)}
            currentModule={this.props.module}
            currentHappiness={this.props.happinessValue} 
            currentQuestion={this.props.currentQuestion}
            ref="comment"
          /> : null }

      { this.state.showMessage ? 
        <SimilarComment 
          display={true}
          age={this.state.posts[chosenPost].age} 
          gender={this.state.posts[chosenPost].gender} 
          rating={this.props.happinessValue} 
          comment={this.state.posts[chosenPost].answer} 
          setShowMessage={this.setShowMessage.bind(this)}
        /> : null }

      { /* this.state.showAllMessages ? 
        <Allmessages
          module={this.props.module}
          currentQuestion={this.props.currentQuestion}
        /> : null */ }

			</div>
		)
	}
}

Lameloverlay.propTypes = {
  text: React.PropTypes.string,
  comment: React.PropTypes.string
}

export default Lameloverlay;
