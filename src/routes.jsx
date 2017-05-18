import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/homePage';
import Result from './components/views/resultPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='result' component={Result} />
    <Route path='*' component={Home} />
  </Route>
);