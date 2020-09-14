import { ADD_ALERTS } from "./alertsActions";
import { serialize } from 'object-to-formdata';
//! URL of API backend. Change when hosted live
const URL = "http://localhost:3001/api/v1/recipes"
const ADD_RECIPES = (payload) => ({type: "ADD_RECIPES", payload})
const ADD_RECIPE = (payload) => ({type: "ADD_RECIPE", payload})
const REMOVE_RECIPE = (payload) => ({type: "REMOVE_RECIPE", payload})
const EDIT_RECIPE = (payload) => ({type: "EDIT_RECIPE", payload})



export const fetchRecipes = () => {
    return (dispatch) => {
       fetch(URL)
        .then( resp => resp.json())
        .then(json => {
            dispatch(ADD_RECIPES(json))
        }) 
        .catch(errors => console.log(errors))
    }
    
  }
  
  // this method accepts ownProps because I'm using the history object to redirect
  export const postRecipe = (recipeObj, ownProps) => {
      return (dispatch) => {
          // Because I am sending a file, I need to use FormData
          const formData = new FormData()
          // This is the image file
          formData.append('image', recipeObj.image)
          // The serialize method comes from object-to-formdata I decided to use this
          // since the recipe object is so deeply nested  
          const recipe = serialize({recipe: recipeObj}, null, formData)
          fetch(URL, {
              method: "POST",
              headers: {
                  // purposely not including content-type because I'm sending form data  
                  "Accepts": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`},
              body: recipe
          })
          .then(resp => resp.json())
          .then(json => {
              // if there are errors add alerts
             !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : 
             // else add the recipe
             dispatch(ADD_RECIPE(json))
             // and redirect the user to the recipe show page
             ownProps.history.push(`/recipes/${json.id}`)
            })
            .catch(errors => console.log(errors))
      }
  }

  export const deleteRecipe = (recipeId, ownProps) => {
      return (dispatch) => {
          // redirect first because otherwise the show page of the recipe will 
          // have errors because it doesn't exists

          // delete it from the store
        ownProps.history.push('/recipes')

        // send a delete request to the backend 
        dispatch(REMOVE_RECIPE(recipeId))
        fetch(URL+`/${recipeId}`, { 
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }})
      }
  }

  // similar to adding a recipe, just a patch request instead of a post request
  export const editRecipe = (recipeObj, ownProps) => {

        const formData = new FormData()
        formData.append('image', recipeObj.image)
        const recipe = serialize({recipe: recipeObj}, null, formData)
      return (dispatch) => {
          fetch(URL+`/${recipeObj.id}`,{
              method: "PATCH",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
              body: recipe
          })
          .then( resp => resp.json())
          .then(json => {
              !!json.errors ? ADD_ALERTS(json.errors) :
              dispatch(EDIT_RECIPE(json))
              ownProps.history.push(`/recipes/${json.id}`)
          })
          .catch(errors => console.log(errors))
      }
  }