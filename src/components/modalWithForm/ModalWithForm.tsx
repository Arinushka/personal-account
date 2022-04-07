import React from 'react';
import { Form, Input, Modal, Button, FormInstance } from 'antd';

import styles from './modalWithForm.module.css';
import { MaskedInput } from 'antd-mask-input';

interface ModalWithFormProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  title: string;
  form: FormInstance;
}

const ModalWithForm: React.FC<ModalWithFormProps> = (props): JSX.Element => {

  const { isVisible, handleCancel, handleSubmit, title, form } = props;

  return (
    <Modal
      className={styles.modal}
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      width="40%"
      footer={[<Button key="submit" className={styles.button} htmlType="submit" onClick={handleSubmit}>Сохранить</Button>]}>
      <Form form={form} autoComplete="off">
        <Form.Item
          name="avatar"
          label="Фотография"
          className={styles.formElement}
          rules={[{ type: 'url', message: 'Аватар должен быть ссылкой' }]}>
          <Input placeholder='Ссылка на фотографию' className={styles.input} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя"
          className={styles.formElement}
          rules={[{ required: true, message: 'Пожалуйста, введите имя!' }, { type: 'string', warningOnly: true }]}>
          <Input placeholder='Введите имя' className={styles.input} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Номер телефона"
          className={styles.formElement}
          rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}>
          <MaskedInput className={styles.input} mask='8-(900)-000-00-00' />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          className={styles.formElement}
          rules={[{ required: true, message: 'Пожалуйста, введите почту!' }, { type: 'email', warningOnly: true, message: "Почта должна быть в формате example@example.ru" }]}>
          <Input placeholder='Введите почту' className={styles.input} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalWithForm;