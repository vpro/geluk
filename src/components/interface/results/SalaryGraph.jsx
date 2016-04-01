import React from 'react';

class SalaryGraph extends React.Component{
  constructor(props){
    super(props);
  }
  
  render() {
    var width = this.props.width;
    const stats = this.props.stats;
    console.log('deze stats', this.props.stats);

    var lessThan1500 = stats.income['<1500'].q_2.total/stats.income['<1500'].q_2.count;
    var lessThan2500 = stats.income['1500><2500'].q_2.total/stats.income['1500><2500'].q_2.count;
    var lessThan3500 = stats.income['2500><3500'].q_2.total/stats.income['2500><3500'].q_2.count;
    var lessThan4500 = stats.income['3500><4500'].q_2.total/stats.income['3500><4500'].q_2.count;
    var lessThan6000 = stats.income['4500><6000'].q_2.total/stats.income['4500><6000'].q_2.count;
    var lessThan7000 = stats.income['6000><7500'].q_2.total/stats.income['6000><7500'].q_2.count;
    var lessThan10000 = stats.income['7500><10000'].q_2.total/stats.income['7500><10000'].q_2.count;
    var moreThan10000 = stats.income['10000>'].q_2.total/stats.income['10000>'].q_2.count;

    var lessThan1500Width = {width: (width/10)*lessThan1500 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan2500Width = {width: (width/10)*lessThan2500 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan3500Width = {width: (width/10)*lessThan3500 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan4500Width = {width: (width/10)*lessThan4500 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan6000Width = {width: (width/10)*lessThan6000 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan7000Width = {width: (width/10)*lessThan7000 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var lessThan10000Width = {width: (width/10)*lessThan10000 + 'px', backgroundColor: '#000', color: '#FFF'} ;
    var moreThan10000Width = {width: (width/10)*moreThan10000 + 'px', backgroundColor: '#000', color: '#FFF'} ;

    var marginleft1500 = {marginLeft: ((width/10)*lessThan1500)-17 + 'px'}
    var marginleft2500 = {marginLeft: ((width/10)*lessThan2500)-17 + 'px'}
    var marginleft3500 = {marginLeft: ((width/10)*lessThan3500)-17 + 'px'}
    var marginleft4500 = {marginLeft: ((width/10)*lessThan4500)-17 + 'px'}
    var marginleft6000 = {marginLeft: ((width/10)*lessThan6000)-17 + 'px'}
    var marginleft7000 = {marginLeft: ((width/10)*lessThan7000)-17 + 'px'}
    var marginleftLT10000 = {marginLeft: ((width/10)*lessThan10000)-17 + 'px'}
    var marginleftMT10000 = {marginLeft: ((width/10)*moreThan10000)-17 + 'px'}
console.log(typeof lessThan1500);
  		return (
        <div>
          <div className="results__millennials-graph">
            <div className="results__millennials-bar" style={lessThan1500Width}>minder dan €1500</div>
            <div className="results__circle" style={marginleft1500}>{lessThan1500.toFixed(1)}</div>
          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan2500Width}>€1500 - €2500 ({lessThan2500.toFixed(1)})</div>
            <div className="results__circle" style={marginleft2500}>{lessThan2500.toFixed(1)}</div>
          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan3500Width}>€2500 - €3500 ({lessThan3500.toFixed(1)})</div>
            <div className="results__circle" style={marginleft3500}>{lessThan3500.toFixed(1)}</div> 
          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan4500Width}>€3500 - €4500 ({lessThan4500.toFixed(1)})</div>
            <div className="results__circle" style={marginleft4500}>{lessThan4500.toFixed(1)}</div>
          </div>  

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan6000Width}>€4500 - €6000 ({lessThan6000.toFixed(1)})</div>
            <div className="results__circle" style={marginleft6000}>{lessThan6000.toFixed(1)}</div>

          </div> 

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan7000Width}>€6000 - €7000 ({lessThan7000.toFixed(1)})</div>
            <div className="results__circle" style={marginleft7000}>{lessThan7000.toFixed(1)}</div>

          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={lessThan10000Width}>€7000 - €10000 ({lessThan10000.toFixed(1)})</div>
            <div className="results__circle" style={marginleftLT10000}>{lessThan10000.toFixed(1)}</div>

          </div>

          <div className="results__millennials-graph results__gender-margin">
            <div className="results__millennials-bar" style={moreThan10000Width}>€10000 - €15000 ({moreThan10000.toFixed(1)})</div>
            <div className="results__circle" style={marginleftMT10000}>{moreThan10000.toFixed(1)}</div>

          </div>                                                                       
        </div>
  		)
		}
}
export default SalaryGraph;