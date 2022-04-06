import React from 'react';
import { Form, Input, Modal, Button } from 'antd';

import styles from './modalWithForm.module.css';

interface ModalWithFormProps {
  isVisible: boolean;
  handleCancel: (action: any) => void;
  handleSubmitAddContact: (action: any) => void;
  title: string;
  form: any;
}

const ModalWithForm: React.FC<ModalWithFormProps> = (props) => {

  const { isVisible, handleCancel, handleSubmitAddContact, title, form } = props;



  return (
    <Modal
      className={styles.modal}
      title={title}
      visible={isVisible}
      onCancel={() => handleCancel(form.resetFields())}
      width="40%"
      footer={[<Button className={styles.button} htmlType="submit" onClick={handleSubmitAddContact}>Сохранить</Button>]}>
      <Form form={form}>
        <Form.Item
          name="avatar"
          label="Фотография"
          className={styles.formElement}>
          <Input placeholder='Ссылка на фотографию' className={styles.input} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя"
          className={styles.formElement}>
          <Input placeholder='Введите имя' className={styles.input} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Номер телефона"
          className={styles.formElement}>
          <Input placeholder='Введите номер телефона' className={styles.input} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          className={styles.formElement}>
          <Input placeholder='Введите почту' className={styles.input} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalWithForm;