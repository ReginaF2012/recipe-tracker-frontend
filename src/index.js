import React from 'react';
import { render } from 'react-dom';
import rootReducer from './reducers/rootReducer';
import Root from './components/root';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

render(<Root store={store} />, document.getElementById('root'))