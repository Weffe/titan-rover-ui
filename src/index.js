import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Router from 'react-router';  
import { DefaultRoute, IndexLink, Link, Route, RouteHandler } from 'react-router';

let routes = (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="module1" component={Module1} />
          <Route path="module2" component={Module2} />
          <Route path='*' component={FourOhFour} />
        </Route>

      </Router>
)

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
