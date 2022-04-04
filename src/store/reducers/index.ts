import { combineReducers } from "redux";
import contacts from "./contacts";

export interface AppState {
  contacts: [];
}

const allReducers = combineReducers({
  contacts
})

export default allReducers;