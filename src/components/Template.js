import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderContainer from './shared/HeaderContainer';
import HomePage from './home/HomeContainer';
import LoginPage from './account/LoginContainer';
import SignUpPage from './account/SignUpPageContainer';
import ChangePasswordPage from './account/ChangePasswordPage';
import ResetPasswordPage from './account/ResetPasswordPageContainer';
import AccountHomePage from './account/HomeContainer';
import SendPage from './account/SendContainer';
import ErrorBox from './shared/ErrorBoxPageContainer';
import '../css/styles.css';


export default function Template(props){
		const { user } = props;
		return(
			<Router>
				<div className="wrapper">		
					<HeaderContainer user={user} />		 
					<div className="content">
						<ErrorBox />					  
						<Route exact path="/" component={HomePage} />
						<Route exact path='/login' component={LoginPage}/>
						<Route exact path='/signup' component={SignUpPage}/>
						<Route exact path='/reset-password' component={ResetPasswordPage} />
						<Route path='/changepassword/:hash' component={ChangePasswordPage} />
						<Route path='/account/:id' component={AccountHomePage}	/>		    
					</div>
				</div>
			</Router>
		);
}
