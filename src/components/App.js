import React from 'react';
import { Component } from 'react';
import { fetchRecipes } from '../actions/recipesActions';
import { connect } from 'react-redux';
import LoginForm from './Users/LoginForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Recipes from './Recipes/Recipes';
import NavBar from './NavBar';
import RecipeForm from './Recipes/RecipeForm';


class App extends Component{

  componentDidMount(){
    this.props.fetchRecipes()
  }

  render(){
    return (
        <Router>
           < NavBar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>

            <Route exact path="/recipes" render={props => (<Recipes {...props} recipes={this.props.recipes} />)} />

            <Route exact path="/login" render={props => (<LoginForm history={props.history} />)} />

            <Route exact path="/recipes/new" render={props => (<RecipeForm history={props.history}/>)}/>

            <Route exact path="/users/:id/recipes" render={props => (<Recipes 
            recipes={this.props.recipes.filter(recipe => recipe.user_id === parseInt(props.match.params.id))}
            />)}/>

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
