import React from 'react';
import { List, Button, Input, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import styles from './contactList.module.css';
import { connect } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Contact } from '../../store/reducers/contacts/types';
import { UserContext } from '../context/UserContext';

interface ContactListsProps {
  contacts: { data: Contact[] },
  handleDelete: any;
  showModalForAdd: any;
  searchContact: any;
  changeValueInput: any;
  showModalForEdit: any;
}

const ContactList: React.FC<ContactListsProps> = (props) => {

  const { contacts, showModalForAdd, handleDelete, searchContact, changeValueInput, showModalForEdit } = props;
  const { Search } = Input;
  const currentUser = React.useContext(UserContext);

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapperTitle}>{currentUser &&`Привет, ${currentUser}! Мы рады тебя видеть!`}<h2 className={styles.title}>Список контактов:</h2><div className={styles.headerList}>
        <Button className={styles.buttonAdd} htmlType="button" onClick={showModalForAdd}>Добавить контакт <PlusSquareOutlined /></Button>
        <Search placeholder="Введите имя для поиска" className={styles.input} onChange={changeValueInput} onSearch={(value: any) => searchContact(value)} />
      </div></div>
      <List
        className={styles.list}
        dataSource={contacts.data}
        renderItem={(item: Contact) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} icon={!item.avatar && <UserOutlined/>}/>}
              title={item.name}
              description={<div className={styles.wrapperInfo}><div>{item.phone}</div><div>{item.email}</div></div>} />
            <div>
              <Button className={styles.button} htmlType="button" icon={<EditOutlined />} onClick={()=>showModalForEdit(item)}></Button>
              <Button className={styles.button} htmlType="button" type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)}></Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default connect((state: AppState) => {
  return {
    contacts: state.contacts
  };
})(ContactList);