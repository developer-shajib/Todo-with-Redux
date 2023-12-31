import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const middleware = [thunk];

// Create redux store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
