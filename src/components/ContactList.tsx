import React, { useEffect, useState } from 'react';
import api from '../api/contacts'
import { List, Button, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './contactList.module.css';
import { useDispatch, connect } from 'react-redux';
import { ActionType } from '../store/actionTypes';
import { AppState } from '../store/reducers';

interface ContactListsProps {
  contacts: []
}

const ContactList: React.FC<ContactListsProps> = (props) => {

  const { contacts } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const { Search } = Input;

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
    <List
      header={<div className={styles.headerList}>
        <h2>Список контактов:</h2>
        <Button className={styles.button} icon={<PlusOutlined />} ></Button>
        <Search placeholder="Введите имя для поиска" className={styles.input} />
      </div>}
      className={styles.list}
      dataSource={contacts}
      renderItem={(item: { name: string, avatar: string, email: string, phone: string }) => (
        <List.Item key={item.name}>
          <List.Item.Meta

            title={item.name}
            description={item.email}
          />
          <div>
            <Button className={styles.button} htmlType="button" icon={<EditOutlined />}></Button>
            <Button className={styles.button} htmlType="button" type="text" icon={<DeleteOutlined />}></Button>
          </div>
        </List.Item>
      )}
    />
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(ContactList);