import React from 'react';

class MillennialsGraph extends React.Component{
  constructor(props){
    super(props);
  }
  
  render() {
    var width = this.props.width;
    const stats = this.props.stats.work_age;
    console.log('deze stats', this.props.stats);

    var totalMillennials = stats['18-28'].calling + stats['18-28'].evil + stats['18-28'].career + stats['29-35'].calling + stats['29-35'].evil + stats['29-35'].career;
    var callingMillennials = stats['18-28'].calling + stats['29-35'].calling;
    var evilMillennials = stats['18-28'].evil + stats['29-35'].evil;
    var careerMillennials = stats['18-28'].career + stats['29-35'].career;

    var totalBabyboomers = stats['51-60'].calling + stats['51-60'].evil + stats['51-60'].career + stats['61-70'].calling + stats['61-70'].evil + stats['61-70'].career;
    var callingBabyboomers = stats['51-60'].calling + stats['61-70'].calling;
    var evilBabyboomers = stats['51-60'].evil + stats['61-70'].evil;
    var careerBabyboomers = stats['51-60'].career + stats['61-70'].career;    

    var millennialFirstWidth = {width: (width/totalMillennials)*evilMillennials + 'px', backgroundColor: '#eee'} ;
    var millennialSecondWidth = {width: (width/totalMillennials)*careerMillennials + 'px', backgroundColor: '#d6d6d6'} ;
    var millennialThirdWidth = {width: (width/totalMillennials)*callingMillennials + 'px', backgroundColor: '#000', color: '#FFF'} ;

    var babyboomersFirstWidth = {width: (width/totalBabyboomers)*evilBabyboomers  + 'px', backgroundColor: '#eee'} ;
    var babyboomersSecondWidth = {width: (width/totalBabyboomers)*careerBabyboomers + 'px', backgroundColor: '#d6d6d6'} ;
    var babyboomersThirdWidth = {width: (width/totalBabyboomers)*callingBabyboomers + 'px', backgroundColor: '#000', color: '#FFF'} ;

  		return (
        <div>
          <span className="results__millennials-tag">Millennials</span>
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={millennialFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={millennialSecondWidth}>carrière</div>
            <div className="results__millennials-bar" style={millennialThirdWidth}>roeping</div>
          </div>

          <span className="results__millennials-margin results__millennials-tag results__extramargin">Babyboomers</span>
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={babyboomersFirstWidth}>noodzakelijk kwaad</div>
            <div className="results__millennials-bar" style={babyboomersSecondWidth}>carrière</div>
            <div className="results__millennials-bar" style={babyboomersThirdWidth}>roeping</div>
          </div>
        </div>
  		)
		}
}
export default MillennialsGraph;