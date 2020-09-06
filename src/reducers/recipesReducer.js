
const recipesReducer = (state = [], action) => {
    switch(action.type) {
      case 'FETCHING_RECIPES':
        return state
      case 'ADD_RECIPES':
        return action.payload
      default:
        return state;
    }
  }
  
  export default recipesReducer;