import React from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../actions/user';

import Template from './Template';

class TemplateContainer extends React.Component{
	constructor(props) {
    super(props);
    this.checkUserSession = this.checkUserSession.bind(this);
  }

  componentWillMount() {
    this.checkUserSession();
  }

  checkUserSession() {
    const { dispatch } = this.props;
    dispatch(checkSession());
  }

	render(){
		const { user } = this.props;
		return(
			<Template user = {user}/>
		);
	}
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(TemplateContainer);