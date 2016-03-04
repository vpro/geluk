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
				<p>Hiep hoi hiep hoi a pirate life for me</p>
			</div>
		)
	}
}

Gelukoverlay.propTypes = {
}

export default Gelukoverlay;