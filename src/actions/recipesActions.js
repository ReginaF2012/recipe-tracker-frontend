const URL = "http://localhost:3001/api/v1/recipes"

export const fetchRecipes = () => {
    return (dispatch) => {
       fetch(URL)
        .then( resp => resp.json())
        .then(json => {
            dispatch({type: "ADD_RECIPES", payload: json})
        }) 
    }
    
  }