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
        <Form.Item name="name">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalWithForm;