import React, { useState } from 'react';
import { Modal, Input, Button, Form, message } from 'antd';

interface AuthDialogProps {
  onSubmit: (name: string, token: string) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    if (!name || !token) {
      message.error('Please enter both your name and token.');
      return;
    }
    onSubmit(name, token);
  };

  return (
    <Modal
      title="Welcome! Please enter your credentials"
      visible={true}
      footer={null}
      onCancel={() => {}}
    >
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input value={name} name='name' onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="GoRest Token" required>
          <Input.Password
            value={token}
            name='token'
            onChange={(e) => setToken(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AuthDialog;
