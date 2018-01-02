import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../../actions/user';

import HeaderPage from './HeaderPage';

class HeaderContainer extends React.Component{
	constructor(props) {
    super(props);

    this.logUserOutFunction = this.logUserOutFunction.bind(this);
  	}

  	logUserOutFunction() {
    	const {dispatch} = this.props;
    	dispatch(logUserOut());
  	}
	render(){
		const { user } = this.props;

		return(
			<HeaderPage  user={user} logUserOutFunction={this.logUserOutFunction} />
		);
	}
}

export default connect()(HeaderContainer);