import React from 'react';
import { Component } from 'react';
import { fetchRecipes } from '../actions/recipesActions';
import { autoLoginUser } from '../actions/usersActions';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Recipe from './Recipes/Recipe';
import Recipes from './Recipes/Recipes';
import NavBar from './NavBar';
import RecipeForm from './Recipes/RecipeForm';
import LoginSignupForm from './Users/LoginSignupForm'
import Alerts from './Alerts';


class App extends Component{

  componentDidMount(){
    this.props.fetchRecipes()
    if(!!localStorage.getItem('token')){
      this.props.autoLoginUser()
    }
  }

  recipesFilteredBySearch(searchTerm){
    let filter = searchTerm.replace(/-/g, ' ')
    return this.props.recipes.filter(recipe => recipe.name.toLowerCase().includes(filter))
  }


  render(){
    return (
        <Router>
           < NavBar />
           <Alerts />
          <Switch>
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>

            <Route path="/login" 
              render={props => (
                !!this.props.user.id ? <Redirect to={`/users/${this.props.user.id}/ recipes`}/> : <LoginSignupForm {...props} />
              )} 
            />

            <Route path="/signup" 
              render={props => (
                !!this.props.user.id ? <Redirect to={`/users/${this.props.user.id}/ recipes`}/> : <LoginSignupForm {...props} />
              )}
            />

            <Route exact path="/recipes" 
              render={()=><Recipes recipes={this.props.recipes}/>} 
            />

            <Route exact path="/recipes/new" 
              render={props => (
              !!this.props.user.id ? <RecipeForm {...props}/> : <Redirect to="/login"/>
              )}
            />

            <Route exact path="/recipes/:id/edit" 
              render={props => (
                !!this.props.user.id ? <RecipeForm {...props} /> : <Redirect to="/recipes"></Redirect>
              )} 
            />

            <Route exact path="/recipes/:id"
              render={props => (
                this.props.recipes.find(recipe => recipe.id === parseInt(props.match.params.id)) ? <Recipe recipe={this.props.recipes.find(recipe => recipe.id === parseInt(props.match.params.id))} /> : <Redirect to="/recipes"/>
              )} 
            />

            <Route exact path="/recipes/search/:searchTerm" 
              render={props => (
                <Recipes recipes={this.recipesFilteredBySearch(props.match.params.searchTerm)}/>
              )}
            />

            <Route exact path="/users/:id/recipes" 
              render={props => (
                <Recipes recipes={this.props.recipes.filter(recipe => recipe.user_id === parseInt(props.match.params.id))} />
              )}
            />


          </Switch>
        </Router>     
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
          fetchRecipes: () => dispatch(fetchRecipes()),
          autoLoginUser: () => dispatch(autoLoginUser())
      }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
