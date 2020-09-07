
const recipesReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_RECIPE':
        return [...state, action.payload]
      case 'ADD_RECIPES':
        return action.payload
      default:
        return state;
    }
  }
  
  export default recipesReducer;