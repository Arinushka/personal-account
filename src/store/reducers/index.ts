import { combineReducers } from "redux";
import contacts from "./contacts/reducer";

export interface AppState {
  contacts: [];
}

const allReducers = combineReducers({
  contacts
})

export default allReducers;