import React from 'react';
import { Component } from 'react';
import { fetchRecipes } from '../actions/recipesActions';
import { connect } from 'react-redux';
import LoginForm from './Users/LoginForm'
import RecipesContainer from '../container/Recipes/RecipesContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class App extends Component{

  componentDidMount(){
    this.props.fetchRecipes()
  }

  render(){
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>

            <Route exact path="/recipes" render={props => (<RecipesContainer {...props} />)} />

            <Route exact path="/login" render={props => (<LoginForm history={props.history} />)} />

          </Switch>
        </Router>     
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
          fetchRecipes: () => dispatch(fetchRecipes())
      }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
