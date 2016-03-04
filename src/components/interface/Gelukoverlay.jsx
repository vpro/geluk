import React from 'react';

class Gelukoverlay extends React.Component{
  constructor(props){
    super(props);

  }

  render() {
    if(this.props.display === false) {
      var style = {
        display: 'none'
      }
    } else {
      var style = {
        display: 'block'
      }
    }
		return (
			<div className="questions__overlay" style={style}>
				<p className="questions__overlaytext">{this.props.text}</p>
			</div>
		)
	}
}

Gelukoverlay.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Gelukoverlay;