import { combineReducers } from "redux";
import contacts from "./contacts/reducer";
import { Contact } from "./contacts/types";

export interface AppState {
  contacts:  {data: Contact[]};
}

const allReducers = combineReducers({
  contacts
})

export default allReducers;