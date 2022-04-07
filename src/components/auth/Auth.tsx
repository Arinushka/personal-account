import React, {  useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './auth.module.css';
import api from '../../api/contacts'
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '../../types/commonTypes';


interface AuthProps {
  setLoggedIn: (boolean: boolean) => void;
  setUserInfo: (value: string) => void;
}

const Auth: React.FC<AuthProps> = (props): JSX.Element => {

  const { setLoggedIn, setUserInfo } = props;
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();


  const signIn = (): void => {
    api.get(`/signupUsers?login=${login}&password=${password}`)
      .then((res: AuthResponse) => {
        if (res.data.length === 1) {
          setLoggedIn(true)
          navigate('/')
          setUserInfo(res.data[0].login)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  return (
    <Form
      className={styles.form}
      name="basic"
      autoComplete="off">
      <div className={styles.formTitle}>Авторизация</div>
      <Form.Item
        className={styles.formItem}
        name="username"
        label="Логин"
        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
        <Input
          className={styles.input}
          onChange={handleLogin}
          placeholder="Введите логин" />
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        name="password"
        label="Пароль"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
        <Input.Password
          className={styles.input}
          onChange={handlePassword}
          placeholder="Введите пароль"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
      </Form.Item>
      <Form.Item >
        <Button className={styles.button} type="primary" htmlType="submit" onClick={signIn}>Войти</Button>
      </Form.Item>
    </Form>
  )
}

export default Auth;