import { combineReducers } from "redux";
import { Contact } from "../../types/commonTypes";
import contacts from "./contacts/reducer";

export interface AppState {
  contacts: { data: Contact[] };
}

const allReducers = combineReducers({
  contacts
})

export default allReducers;