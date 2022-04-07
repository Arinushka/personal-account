import { Contact } from "../../../types/commonTypes";

export const CONTACT_LOADED = 'CONTACT_LOADED';
export const CONTACT_ADD = 'CONTACT_ADD';
export const CONTACT_EDIT = 'CONTACT_EDIT';
export const CONTACT_DELETE = 'CONTACT_DELETE';

interface ILoaded {
  type: typeof CONTACT_LOADED;
  payload: {
    data: Contact[];
  };
}

interface IAddContact {
  type: typeof CONTACT_ADD;
  payload: {
    contact: Contact;
  };
}

interface IDeleteContact {
  type: typeof CONTACT_DELETE;
  payload: {
    id: number | null;
  };
}

export interface IContactsState {
  data: Contact[];
};

export type ActionType =
  | ILoaded
  | IAddContact
  | IDeleteContact