import React from 'react';

class Truefalse extends React.Component{
  render() {
    return (
      <div className="questions__summary" >
        <h4 className="questions__heading">{this.props.moduleHeadline}</h4>
        <p className="questions__summarytext">{this.props.moduleDescription}</p>
      </div>
    )
  }
}

Truefalse.propTypes = {

}

export default Truefalse;