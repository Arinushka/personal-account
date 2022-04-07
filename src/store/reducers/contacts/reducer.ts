import { Reducer } from "redux";
import { ActionType, IContactsState, CONTACT_LOADED, CONTACT_ADD, CONTACT_DELETE } from "./types";

const initialState: IContactsState = {
  data: []
}

const contacts: Reducer<IContactsState, ActionType> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CONTACT_LOADED:
      return { ...state, data: action.payload.data }
    case CONTACT_DELETE:
      return { ...state, data: state.data.filter((x) => x.id !== action.payload.id) }
    case CONTACT_ADD:
      return { ...state, data: [action.payload.contact, ...state.data] }
    default:
      return state;
  }
}

export default contacts;