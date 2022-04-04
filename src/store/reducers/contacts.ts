const initialState: any = [];

const contacts = function (state: any = initialState, action: { type: string, payload: [] }) {
  switch (action.type) {
    case "GET_CONTACTS":
      return action.payload
    default:
      return state
  }

}

export default contacts;