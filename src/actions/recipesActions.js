import { ADD_ALERTS } from "./alertsActions";

const URL = "http://localhost:3001/api/v1/recipes"
const ADD_RECIPES = (payload) => ({type: "ADD_RECIPES", payload})
const ADD_RECIPE = (payload) => ({type: "ADD_RECIPE", payload})
const REMOVE_RECIPE = (payload) => ({type: "REMOVE_RECIPE", payload})

export const fetchRecipes = () => {
    return (dispatch) => {
       fetch(URL)
        .then( resp => resp.json())
        .then(json => {
            dispatch(ADD_RECIPES(json))
        }) 
        .catch(errors => dispatch(ADD_ALERTS(errors)))
    }
    
  }
  

  export const postRecipe = (recipe, ownProps) => {
      return (dispatch) => {
          fetch(URL, {
              method: "POST",
              headers: {
                  "Content-type": 'application/json',
                  "Accepts": "application/json"
              },
              body: JSON.stringify(recipe)
          })
          .then(resp => resp.json())
          .then(json => {
             !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : 
             dispatch(ADD_RECIPE(json))
             ownProps.history.push(`/recipes/${json.id}`)
            })
            .catch(errors => dispatch(ADD_ALERTS(errors)))
      }
  }

  export const deleteRecipe = (recipeId, ownProps) => {
      return (dispatch) => {
        ownProps.history.push('/recipes')
        dispatch(REMOVE_RECIPE(recipeId))
        fetch(URL+`/${recipeId}`, { method: "DELETE"})
      }
  }