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
import Recipes from '../container/Recipes/Recipes';
import NavBar from './NavBar';
import RecipeForm from './Recipes/RecipeForm';
import Login from '../container/Users/Login';
import SignUp from '../container/Users/SignUp';
import Alerts from '../container/Alerts/Alerts';



class App extends Component{

  
  componentDidMount(){
    // get all of the recipes
    this.props.fetchRecipes()
    // if there is a token in local storage send it to the backend to login the user
    if(!!localStorage.getItem('token')){
      this.props.autoLoginUser()
    }
  }


  recipesFilteredBySearch(searchTerm){
    // the searchTerm comes from the url, replace dashes with spaces
    let filter = searchTerm.replace(/-/g, ' ')

    // iterate over all of the recipes and find the ones who's name(title) matches the filter
    return this.props.recipes.filter(recipe => recipe.name.toLowerCase().includes(filter))
  }


  render(){
    return (
        <Router>
           < NavBar />
           {/* if there are alerts, display them */}
            { this.props.alerts.length > 0 && <Alerts alerts={this.props.alerts}/>}
          <Switch>
            {/* Recipes index is landing page */}
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>

            <Route path="/login" 
            // if there is a user in the store, redirect them to their recipes index rather than display the login form
              render={() => (
                !!this.props.user.id ? <Redirect to={`/users/${this.props.user.id}/recipes`}/> : <Login/>
              )} 
            />

            <Route path="/signup" 
            // same as login, if user in store, redirect
              render={() => (
                !!this.props.user.id ? <Redirect to={`/users/${this.props.user.id}/recipes`}/> : < SignUp/>
              )}
            />

            <Route exact path="/recipes" 
            // pass recipes to Recipe container component
              render={()=><Recipes recipes={this.props.recipes}/>} 
            />

            <Route path="/recipes/new" 
              render={props => (
                // should only be able to create a recipe if logged in
              !!this.props.user.id ? <RecipeForm {...props}/> : <Redirect to="/login"/>
              )}
            />

            <Route path="/recipes/:id/edit" 
              render={props => (
                // should only be able to edit a recipe if logged in
                !!this.props.user.id ? <RecipeForm {...props} /> : <Redirect to="/recipes"></Redirect>
              )} 
            />

            <Route exact path="/recipes/:id"
              render={props => (
                // if the recipe exists, render the show page component
                this.props.recipes.find(recipe => recipe.id === parseInt(props.match.params.id)) ? 
                <Recipe {...props} recipe={this.props.recipes.find(recipe => recipe.id === parseInt(props.match.params.id))} /> 
                // else redirect
                : <Redirect to="/recipes"/>
              )} 
            />

            <Route exact path="/recipes/search/:searchTerm" 
              render={props => (
                // use recipe container but only send recipes that match the search term
                <Recipes recipes={this.recipesFilteredBySearch(props.match.params.searchTerm)}/>
              )}
            />

            <Route exact path="/users/:id/recipes" 
              render={props => (
                // user index of recipes
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
