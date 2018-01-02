import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';


const renderLogin = () => (
  <ul className="nav navbar-nav navbar-right">
      <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
      <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
  </ul>
);

class HeaderPage extends React.Component{

	constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleOnclickUser=this.handleOnclickUser.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  logOutClick(e) {
    e.preventDefault();
    const { logUserOutFunction } = this.props;
    logUserOutFunction();
    this.context.router.history.push('/');
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleOnclickUser(){
    const { id } = this.props.user;
    this.context.router.history.push('/account/'+id);
  }


  renderGreeting(name) {
    return (
    <ul className="nav navbar-nav navbar-right">
		<li><button onClick={this.handleOnclickUser} className="btn btn-info navbar-btn">Welcome,{name}</button></li>
		<li><Link to="/logout" onClick={this.logOutClick}>Logout</Link></li>
	</ul>
    );
  }
	render(){

	const { isLoggedIn, username ,id} = this.props.user;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" >KCOIN</Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
             <li><Link to="/contact">Contact</Link></li>
          </ul>
          { isLoggedIn ? this.renderGreeting(username) : renderLogin() }
        </div>
      </nav>
    );
		
	}
}

HeaderPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default HeaderPage;