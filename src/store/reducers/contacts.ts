import { Action, ActionType } from "../actionTypes";

const initialState: [] = [];

const contacts = function (state: [] = initialState, action: Action<ActionType, []>) {
  switch (action.type) {
    case ActionType.GET_CONTACTS:
      return action.payload
    default:
      return state
  }

}

export default contacts;