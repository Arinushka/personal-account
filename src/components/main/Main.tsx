import React, { useEffect, useState } from 'react';
import api from '../../api/contacts'
import ContactList from '../contactList/ContactList';
import { useForm } from 'antd/lib/form/Form';
import { connect, useDispatch } from 'react-redux';
import ModalWithForm from '../modalWithForm/ModalWithForm';
import { addContact, deleteContact, loaded } from '../../store/reducers/contacts/actions';
import { AppState } from '../../store/reducers';
import { notification, } from 'antd';
import { Contact, UserEdit, UserResponse, UsersResponse, ValidationError } from '../../types/commonTypes';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';


interface MainProps {
  contacts: { data: Contact[] }
}

const Main: React.FC<MainProps> = (props): JSX.Element => {

  const [isModalAddVisible, setIsModalAddVisible] = useState<boolean>(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [item, setItem] = useState<Contact>({ id: null, name: '', avatar: '', phone: '', email: '' });
  const [formEditContact] = useForm();
  const [formAddContact] = useForm();
  const dispatch = useDispatch();
  const { contacts } = props;

  const showModalForAdd = (): void => {
    setIsModalAddVisible(true);
    formAddContact.resetFields()
  };

  const showModalForEdit = (item: Contact): void => {
    formEditContact.setFieldsValue(item)
    setItem(item)
    setIsModalEditVisible(true)
  }

  const addNewContact = (data: Contact): void => {
    api.post(`/contacts`, data)
      .then((res: UserResponse) => {
        dispatch(addContact(res.data));
      })
      .catch((err: string) => {
        console.log(err);
      })
  }

  const handleDelete = (id: number | null): void => {
    api.delete(`/contacts/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
      })
      .catch((err: string) => {
        console.log(err);
      })
  }

  const searchContact = (value: string): void => {
    api.get(`/contacts`)
      .then((res: UsersResponse) => {
        const findContacts = res.data.filter((x: Contact) => x.name.toLowerCase().includes(value.toLowerCase()));
        dispatch(loaded(findContacts));
      })
      .catch((err: string) => {
        console.log(err);
      })
  }

  const handleEdit = (value: UserEdit): void => {
    api.patch(`/contacts/${item?.id}`, value)
      .then((res: UserResponse) => {
        if (item) {
          const index = contacts.data.indexOf(item)
          contacts.data.splice(index, 1, res.data)
          dispatch(loaded(contacts.data));
        }
      })
      .catch((err: string) => {
        console.log(err);
      })
  }


  const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === '') {
      getData();
    }
  }

  const successCallback = (): void => {
    addNewContact(formAddContact.getFieldsValue());
    setIsModalAddVisible(false);
    formAddContact.resetFields();
  }

  const failureCallback = (error: ValidateErrorEntity): void => {
    notification.error({
      description: error.errorFields.map((error: ValidationError) => error.errors),
      message: "Заполните все обязательные поля формы"
    })
  }

  const handleSubmitAddContact = (): void => {
    formAddContact.validateFields().then(successCallback, error => failureCallback(error))
  };

  const handleSubmitEditContact = (): void => {
    handleEdit(formEditContact.getFieldsValue())
    setIsModalEditVisible(false);
  }

  const handleCancel = (): void => {
    setIsModalAddVisible(false);
    setIsModalEditVisible(false);
  };

  const getData = (): void => {
    api.get(`/contacts`)
      .then((res: UsersResponse) => {
        dispatch(loaded(res.data));
      })
      .catch((err: string) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ContactList showModalForAdd={showModalForAdd} showModalForEdit={showModalForEdit} handleDelete={handleDelete} searchContact={searchContact} changeValueInput={changeValueInput} />
      <ModalWithForm form={formAddContact} title="Новый контакт" isVisible={isModalAddVisible} handleCancel={handleCancel} handleSubmit={handleSubmitAddContact} />
      <ModalWithForm form={formEditContact} title="Редактирование контакта" isVisible={isModalEditVisible} handleCancel={handleCancel} handleSubmit={handleSubmitEditContact} />
    </>
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(Main);