import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import usersReducer from "./usersReducer";
 
const rootReducer = combineReducers({
  recipes: recipesReducer,
  user: usersReducer
});
 
export default rootReducer;