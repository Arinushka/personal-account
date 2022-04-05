import React, { useEffect, useState } from 'react';
import api from '../api/contacts'
import ContactList from './ContactList';

import { useDispatch } from 'react-redux';

import ModalWithForm from './ModalWithForm';
import { addContact, deleteContact, loaded } from '../store/reducers/contacts/actions';


const Main: React.FC = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const addNewContact = (data: any) => {
    api.post(`/contacts`, data)
      .then((res) => {
        dispatch(addContact(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (id: any) => {
    api.delete(`/contacts/${id}`)
      .then(() => {
        dispatch(deleteContact(id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleOk = (action: any) => {
    addNewContact(action)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    api.get(`/contacts`)
      .then((res) => {
        dispatch(loaded(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ContactList showModal={showModal} handleDelete={handleDelete} />
      <ModalWithForm isVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} />

    </>
  )
}

export default Main;