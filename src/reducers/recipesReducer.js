const recipesReducer = (state = [], action) => {
    switch(action.type) {
      case 'LOADING_RECIPES':
        return {
          ...state,
          recipes: [...state.recipes]
        }
      case 'ADD_RECIPES':
        return {
          ...state,
          recipes: action.payload
        }
      default:
        return state;
    }
  }
  
  export default recipesReducer;