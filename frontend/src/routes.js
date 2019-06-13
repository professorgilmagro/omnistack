import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import New from './pages/New';
import NotFound from './pages/NotFound';

function Routes() {
	return (
		<Switch>
			<Route exact path='/' component={Feed} />
			<Route path='/new' component={New} />
			<Route path='*' component={NotFound} />
		</Switch>
	);
}

export default Routes;
