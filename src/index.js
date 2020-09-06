 import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

import rootReducer from './reducers/rootReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/recipes" />
                </Route>
                <Route path="/recipes">
                    < App />
                </Route>
            </Switch>
        </Router>
    </ Provider>,
  document.getElementById('root')
);