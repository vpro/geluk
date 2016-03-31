import React from 'react';

class GenderGraph extends React.Component{
  constructor(props){
    super(props);
  }
  
  render() {
    var width = this.props.width;
    const stats = this.props.stats;
    console.log('deze stats', this.props.stats);

    var averageMales = stats.gender.male.q_2.total/stats.gender.male.q_2.count;
    var averageFemales = stats.gender.female.q_2.total/stats.gender.female.q_2.count;

    var maleWidth = {width: (width/10)*averageMales + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var femaleWidth = {width: (width/10)*averageFemales + 'px', backgroundColor: '#000', color: '#FFF'} ;

      return (
        <div>
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={maleWidth}>mannen ({averageMales.toFixed(1)})</div>
          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={femaleWidth}>vrouwen ({averageFemales.toFixed(1)})</div>
          </div>
        </div>
      )
    }
}
export default GenderGraph;