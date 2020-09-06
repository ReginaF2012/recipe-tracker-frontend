import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../App';
import PropTypes from 'prop-types'

import { Provider } from 'react-redux';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  )
  
  Root.propTypes = {
    store: PropTypes.object.isRequired
  }
  
  export default Root