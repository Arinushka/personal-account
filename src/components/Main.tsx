import React, { useEffect, useState } from 'react';
import api from '../api/contacts'
import ContactList from './ContactList';

import { useDispatch } from 'react-redux';
import { ActionType } from '../store/actionTypes';
import ModalWithForm from './ModalWithForm';


const Main: React.FC = () => {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    api.get(`/contacts`)
      .then((res) => {
        dispatch({
          type: ActionType.GET_CONTACTS,
          payload: res.data
        })

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
      <ContactList showModal={showModal} />
      <ModalWithForm  isVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk}/>
   
    </>
  )
}

export default Main;