import React from 'react';
import { Modal } from 'antd';

interface ModalWithFormProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

const ModalWithForm: React.FC<ModalWithFormProps> = (props) => {

  const { isVisible, handleCancel, handleOk } = props;

  console.log(isVisible)

  return (
    <Modal title="Basic Modal"  visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default ModalWithForm;