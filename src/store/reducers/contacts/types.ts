export const CONTACT_LOADED = 'CONTACT_LOADED';
export const CONTACT_ADD = 'CONTACT_ADD';
export const CONTACT_EDIT = 'CONTACT_EDIT';
export const CONTACT_DELETE = 'CONTACT_DELETE';

export type Contact = {
  id: number;
  name: string;
  email: string;
};

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
    id: number;
  };
}

export interface IContactsState {
  data: Contact[];
};

export type ActionType =
  | ILoaded
  | IAddContact
  | IDeleteContact