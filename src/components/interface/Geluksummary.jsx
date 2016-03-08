import React from 'react';

class Geluksummary extends React.Component{
  render() {
		return (
			<div className="questions__summary" >
        <h4 className="questions__heading">{this.props.moduleHeadline}</h4>
        <p className="questions__summarytext">{this.props.moduleDescription}</p>
			</div>
		)
	}
}

Geluksummary.propTypes = {
  moduleHeadline: React.PropTypes.string.isRequired,
  moduleDescription: React.PropTypes.string.isRequired
}

export default Geluksummary;