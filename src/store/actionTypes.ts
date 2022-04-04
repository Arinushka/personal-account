export interface Action <E, T> {
  type: E,
  payload?: T;
}

export enum ActionType {
  GET_CONTACTS
}