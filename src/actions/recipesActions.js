import { ADD_ALERTS } from "./alertsActions";

const URL = "http://localhost:3001/api/v1/recipes"
const ADD_RECIPES = (payload) => ({type: "ADD_RECIPES", payload})
const ADD_RECIPE = (payload) => ({type: "ADD_RECIPE", payload})

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
  

  export const postRecipe = (recipe) => {
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
             !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : dispatch(ADD_RECIPE(json))})
            .catch(errors => dispatch(ADD_ALERTS(errors)))
      }
  }