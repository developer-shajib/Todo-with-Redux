import { combineReducers } from "redux";
import { todoReducer } from "./todo/todoReducer";

// Crate Combine Reducer
export const rootReducer = combineReducers({
  todo: todoReducer,
});
