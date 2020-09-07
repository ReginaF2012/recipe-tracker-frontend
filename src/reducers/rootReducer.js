import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import usersReducer from "./usersReducer";
import alertsReducer from "./alertsReducer";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  user: usersReducer,
  alerts: alertsReducer
});
 
export default rootReducer;