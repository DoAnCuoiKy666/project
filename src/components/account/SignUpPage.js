import React from 'react';
import {Button , Form ,Label ,Input , FormGroup ,Col} from 'reactstrap';

class SignUpPage extends React.Component{
	constructor(props) {
    	super(props);

    	this.state={
    		email:'',
    		password:'',
    		username:''
    	};

    	this.handleOnSignUp=this.handleOnSignUp.bind(this);
    	this.handleEmailChange=this.handleEmailChange.bind(this);
    	this.handlePasswordChange=this.handlePasswordChange.bind(this);
    	this.handleUsernameChange=this.handleUsernameChange.bind(this);
    }

    handlePasswordChange(e) {
    	this.setState({ password: e.target.value });
  	}
    handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}

  	handleUsernameChange(e){
  		this.setState({username:e.target.value});
  	}



    handleOnSignUp(){
    	const { signUpFunction } = this.props;
    	const formData = this.state;
    	signUpFunction(formData);
    }
	render(){
		return(
			<div className="container">
				<Form >
					 <FormGroup row>
			          <Label for="exampleUsername" sm={2}>UserName</Label>
			          <Col sm={10}>
			            <Input 
			            	type="text" 
			            	name="username" 
			            	id="exampleUsername" 
			            	placeholder="Enter Username"
			            	value={this.state.username}
			            	onChange={this.handleUsernameChange}

			            />
			          </Col>
			        </FormGroup>
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
			          <Col sm={{ size: 10, offset: 2 }}>
			            <Button className="btn btn-info" onClick={this.handleOnSignUp}>Sign Up</Button>
			          </Col>
			        </FormGroup>
			    </Form>
			</div>
		);
	}
}

export default SignUpPage;