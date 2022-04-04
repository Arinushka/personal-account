import { applyMiddleware, createStore } from "redux";
import allReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const appStore = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

export default appStore;