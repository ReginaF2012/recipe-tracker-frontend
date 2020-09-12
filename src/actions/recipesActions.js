import { ADD_ALERTS } from "./alertsActions";
import { serialize } from 'object-to-formdata';

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
  

  export const postRecipe = (recipeObj, ownProps) => {
      return (dispatch) => {
          const formData = new FormData()
          formData.append('image', recipeObj.image)
          const recipe = serialize({recipe: recipeObj}, null,formData)
          fetch(URL, {
              method: "POST",
              headers: {
                  "Accepts": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`},
              body: recipe
          })
          .then(resp => resp.json())
          .then(json => {
             !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : 
             dispatch(ADD_RECIPE(json))
             ownProps.history.push(`/recipes/${json.id}`)
            })
            .catch(errors => console.log(errors))
      }
  }

  export const deleteRecipe = (recipeId, ownProps) => {
      return (dispatch) => {
        ownProps.history.push('/recipes')
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
              body: formData
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