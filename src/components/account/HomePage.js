import React from 'react';

class HomePage extends React.Component{

	constructor(props) {
    	super(props);
	}
	render(){
		const { address ,kcoin_actual_balance,kcoin_available_balances } = this.props.user;
		return(
			<div className="container">
				<div className="jumbotron">
				    <h1>Information</h1>      
				    <p>Address: {address}</p>
				    <p>KCOIN Actual balance: {kcoin_actual_balance}</p>
				    <p>Kcoin Available balance:{kcoin_available_balances} </p>
				    <button className="btn btn-success">Send</button>
				    <button className=" receive btn btn-success">Receive</button>
				</div>
			</div>
		);
	}
}

export default HomePage;