import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class NotFound extends Component {
	state = {};
	render() {
		return (
			<div class='not-found'>
				<div className='content'>
					<h1>Sorry, this page isn't available.</h1>
					<p>
						The link you followed may be broken, or the page may
						have been removed.
						<Link to='/'>Go back to Instagram.</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default NotFound;
