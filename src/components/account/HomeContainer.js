import React from 'react';
import { connect } from 'react-redux';

import HomeAccountPage from './HomePage';

class HomeAccountContainer extends React.Component{
	render(){
		const {user} = this.props;

		return(
			<HomeAccountPage user={user} />
		);

	}
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(HomeAccountContainer);