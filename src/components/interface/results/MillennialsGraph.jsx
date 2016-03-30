import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'gsap';

class MillennialsGraph extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var DOMnode = ReactDOM.findDOMNode(this);
  }

  render() {
    var width = this.props.width;
    const stats = this.props.stats.work_age;
    console.log('deze stats', this.props.stats);

    var totalMillennials = stats['18-28'].calling + stats['18-28'].evil + stats['18-28'].career + stats['29-35'].calling + stats['29-35'].evil + stats['29-35'].career;
    var callingMillennials = stats['18-28'].calling + stats['29-35'].calling;
    var evilMillennials = stats['18-28'].evil + stats['29-35'].evil;
    var careerMillennials = stats['18-28'].career + stats['29-35'].career;

    console.log('career', careerMillennials);
    console.log('calling', callingMillennials);
    console.log('evil', evilMillennials);

    console.log('width ', typeof width);

    console.log('aantal millenials', totalMillennials)

    var millennialFirstWidth = {width: (width/totalMillennials)*evilMillennials + 'px', backgroundColor: '#eee'} ;
    var millennialSecondWidth = {width: (width/totalMillennials)*careerMillennials + 'px', backgroundColor: '#d6d6d6'} ;
    var millennialThirdWidth = {width: (width/totalMillennials)*callingMillennials + 'px', backgroundColor: '#000', color: '#FFF'} ;

    var babyboomersFirstWidth = {width: width/100*20 + 'px', backgroundColor: '#eee'} ;
    var babyboomersSecondWidth = {width: width/100*60 + 'px', backgroundColor: '#d6d6d6'} ;
    var babyboomersThirdWidth = {width: width/100*20 + 'px', backgroundColor: '#000', color: '#FFF'} ;
  		return (
        <div>
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={millennialFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={millennialSecondWidth}>carriere</div>
            <div className="results__millennials-bar" style={millennialThirdWidth}>roeping</div>
          </div>

          <div className="results__millennials-graph results__millennials-margin">
            <div className="results__millennials-bar" style={babyboomersFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={babyboomersSecondWidth}>carriere</div>
            <div className="results__millennials-bar" style={babyboomersThirdWidth}>roeping</div>
          </div>
        </div>
  		)
		}
}
export default MillennialsGraph;