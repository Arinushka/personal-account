import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

interface ModalWithFormProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleOk: (action: any) => void;
}

const ModalWithForm: React.FC<ModalWithFormProps> = (props) => {

  const { isVisible, handleCancel, handleOk } = props;

  const [form] = useForm()

  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={()=>handleOk(form.getFieldsValue())} onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item name="name" label="Имя">
          <Input placeholder='Введите имя'></Input>
        </Form.Item>
        <Form.Item name="email"  label="Почта">
          <Input  placeholder='Введите почту'></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalWithForm;