import React from 'react';
import { List, Button, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './contactList.module.css';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';
import { Contact } from '../store/reducers/contacts/types';

interface ContactListsProps {
  contacts: {data: Contact[]},
  handleDelete: any;
  showModal: () => void;
}

const ContactList: React.FC<ContactListsProps> = (props) => {

  const { contacts, showModal, handleDelete } = props;
  const { Search } = Input;

  return (
    <>
    
      <List
        header={<div><h2 className={styles.title}>Список контактов:</h2><div className={styles.headerList}>
          <Button className={styles.buttonAdd} htmlType="button" onClick={showModal}>Добавить контакт <PlusOutlined /></Button>
          <Search placeholder="Введите имя для поиска" className={styles.input} />
        </div></div>}
        className={styles.list}
        dataSource={contacts.data}
        renderItem={(item: Contact) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.name}
              description={item.email}
            />
            <div>
              <Button className={styles.button} htmlType="button" icon={<EditOutlined />}></Button>
              <Button className={styles.button} htmlType="button" type="text" icon={<DeleteOutlined />} onClick={()=>handleDelete(item.id)}></Button>
            </div>
          </List.Item>
        )}
      />
    </>
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(ContactList);