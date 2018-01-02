import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {logInUser}  from '../../actions/user';

import LoginPage from './LoginPage';

class LoginContainer extends React.Component{
	constructor(props) {
    super(props);

    	this.logUserInFunction = this.logUserInFunction.bind(this);
	}

	logUserInFunction(userData){
		const {dispatch}=this.props;
		dispatch(logInUser(userData));
	}
	
	render(){
		const { user } = this.props;

    	if (user.isLoggedIn) {
     	 return (
        	<Redirect to="/" />
      	);
    	}
    	
		return(
			<div className="container">
				<LoginPage loginFunction={this.logUserInFunction} />
			</div>
		);
	}

}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(LoginContainer);
