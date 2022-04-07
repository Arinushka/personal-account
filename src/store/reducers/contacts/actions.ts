import { Contact } from "../../../types/commonTypes";
import { ActionType, CONTACT_LOADED, CONTACT_ADD, CONTACT_DELETE } from "./types";

export function loaded(data: Contact[]): ActionType {
  return {
    type: CONTACT_LOADED,
    payload: {
      data
    }
  }
}

export function deleteContact(id: number | null): ActionType {
  return {
    type: CONTACT_DELETE,
    payload: {
      id
    }
  }
}

export function addContact(contact: Contact): ActionType {
  return {
    type: CONTACT_ADD,
    payload: {
      contact
    }
  }
}
