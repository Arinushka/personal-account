import React from 'react';
import { List, Button, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './contactList.module.css';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';

interface ContactListsProps {
  contacts: [],
  showModal: () => void;
}

const ContactList: React.FC<ContactListsProps> = (props) => {

  const { contacts, showModal } = props;
  const { Search } = Input;

  return (
    <>
      <List
        header={<div className={styles.headerList}>
          <h2>Список контактов:</h2>
          <Button className={styles.button} icon={<PlusOutlined />} htmlType="button" onClick={showModal}></Button>
          <Search placeholder="Введите имя для поиска" className={styles.input} />
        </div>}
        className={styles.list}
        dataSource={contacts}
        renderItem={(item: { name: string, avatar: string, email: string, phone: string, id: number }) => (
          <List.Item key={item.id}>
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
    </>
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(ContactList);