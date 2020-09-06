import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
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
import App from './components/App';
import NavBar from './components/NavBar'
import LoginForm from './components/Users/LoginForm';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
      < NavBar />
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/recipes" />
                </Route>
                <Route path="/recipes">
                    < App />
                </Route>
                <Route path="/login">
                  < LoginForm />
                </Route>
            </Switch>
        </Router>
    </ Provider>,
  document.getElementById('root')
);