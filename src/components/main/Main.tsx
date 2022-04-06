import React, { useEffect, useState } from 'react';
import api from '../../api/contacts'
import ContactList from '../contactList/ContactList';
import { useForm } from 'antd/lib/form/Form';
import { connect, useDispatch } from 'react-redux';
import ModalWithForm from '../modalWithForm/ModalWithForm';
import { addContact, deleteContact, loaded } from '../../store/reducers/contacts/actions';
import { Contact } from '../../store/reducers/contacts/types';
import { AppState } from '../../store/reducers';

interface MainProps {
  contacts: { data: Contact[] }
}



const Main: React.FC<MainProps> = ({ contacts }) => {

  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [item, setItem] = useState<any>();
  const [formEditContact] = useForm();
  const [formAddContact] = useForm();

  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalAddVisible(true);
  };

  const showModalForEdit = (item: Contact) => {
    formEditContact.setFieldsValue(item)
    setItem(item)
    setIsModalEditVisible(true)
  }

  const addNewContact = (data: Contact) => {
    api.post(`/contacts`, data)
      .then((res) => {
        dispatch(addContact(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDelete = (id: any) => {
    api.delete(`/contacts/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const searchContact = (value: any) => {
    api.get(`/contacts`)
      .then((res) => {
        const findContacts = res.data.filter((x: any) => x.name.toLowerCase().includes(value.toLowerCase()));
        dispatch(loaded(findContacts));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleEdit = (value: any) => {
    api.patch(`/contacts/${item.id}`, value)
      .then((res) => {
        const index = contacts.data.indexOf(item)
        contacts.data.splice(index, 1, res.data)
        dispatch(loaded(contacts.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      getData();
    }
  }

  const handleSubmitAddContact = () => {
    addNewContact(formAddContact.getFieldsValue());
    setIsModalAddVisible(false);
    formAddContact.resetFields();
  };

  const handleSubmitEditContact = () => {
    handleEdit(formEditContact.getFieldsValue())
    setIsModalEditVisible(false);
  }

  const handleCancel = (action: any) => {
    setIsModalAddVisible(false);
    setIsModalEditVisible(false);
    action();
  };

  const getData = () => {
    api.get(`/contacts`)
      .then((res) => {
        dispatch(loaded(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ContactList showModal={showModal} showModalForEdit={showModalForEdit} handleDelete={handleDelete} searchContact={searchContact} changeValueInput={changeValueInput} />
      <ModalWithForm form={formAddContact} title="Новый контакт" isVisible={isModalAddVisible} handleCancel={handleCancel} handleSubmitAddContact={handleSubmitAddContact} />
      <ModalWithForm form={formEditContact} title="Редактирование контакта" isVisible={isModalEditVisible} handleCancel={handleCancel} handleSubmitAddContact={handleSubmitEditContact} />
    </>
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(Main);