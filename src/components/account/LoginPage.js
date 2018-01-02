import React from 'react';
import {Button , Form ,Label ,Input , FormGroup ,Col} from 'reactstrap';
import { Link } from 'react-router-dom';


class LoginPage extends React.Component{
	constructor(props) {
    	super(props);

    	this.state={
    		email:'',
    		password:''
    	};

    	this.handleOnLogin=this.handleOnLogin.bind(this);
    	this.handleEmailChange=this.handleEmailChange.bind(this);
    	this.handlePasswordChange=this.handlePasswordChange.bind(this);


    }

    handlePasswordChange(e) {
    	this.setState({ password: e.target.value });
  	}
    handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}



    handleOnLogin(){
    	const { loginFunction } = this.props;
    	const formData = this.state;
    	loginFunction(formData);
    }
	render(){
		return(
			<div className="container">
				<Form >
			        <FormGroup row>
			          <Label for="exampleEmail" sm={2}>Email</Label>
			          <Col sm={10}>
			            <Input 
			            	type="email" 
			            	name="email" 
			            	id="exampleEmail" 
			            	placeholder="with a placeholder"
			            	value={this.state.email}
			            	onChange={this.handleEmailChange}

			            />
			          </Col>
			        </FormGroup>
			        <FormGroup row>
			          <Label for="examplePassword" sm={2}>Password</Label>
			          <Col sm={10}>
			            <Input 
			            	type="password" 
			            	name="password" 
			            	id="examplePassword" 
			            	placeholder="password placeholder" 
			            	value={this.state.password}
			            	onChange={this.handlePasswordChange}
			            />
			          </Col>
			        </FormGroup>

			        <FormGroup  row>
			          <Col sm={{ size: 7, offset: 2 }}>
			            <Button className="btn btn-success" onClick={this.handleOnLogin}>Login</Button>
			          </Col>

			           <Col sm={{ size: 3, offset: 2 }}>
			            <Link to="/reset-password" >Forgot password ?</Link>
			          </Col>

			        </FormGroup>


			    </Form>
			</div>
		);
	}
}

export default LoginPage;