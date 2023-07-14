import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Form, Input, Layout, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '../slices/authSlice';
import '../components/Components.css';
import './Pages.css';
import authService from '../service/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (isRegistering) {
            authService
                .register(values)
                .then((response) => {
                    console.log('Registration successful!');
                    message.success('Регистрация выполнена успешно!');

                })
                .catch((error) => {
                    console.log('Registration error:', error);

                });
        } else {
            authService
                .login(values)
                .then((user) => {
                    console.log(user);
                    dispatch(login(user));
                    message.success('Вход выполнен успешно!');
                    navigate('/app');
                })
                .catch((error) => {
                    console.log('Login error:', error);
                });
        }
    };

    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <Layout className="gradient-layout">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card
                    hoverable
                    style={{
                        width: 500,
                        margin: '50px auto',
                    }}
                    cover={<img alt="example" src="/top.png" />}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Form
                            name={isRegistering ? 'register' : 'login'}
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите имя пользователя!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя пользователя" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите пароль!',
                                    },
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль" />
                            </Form.Item>

                            {isRegistering && (
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Введите корректный адрес электронной почты!',
                                        },
                                        {
                                            required: true,
                                            message: 'Введите адрес электронной почты!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                            )}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{
                                        background: 'black',
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {isRegistering ? 'Регистрация' : 'Войти'}
                                </Button>
                                Или{' '}
                                <a href="#" onClick={handleToggleForm}>
                                    {isRegistering ? 'войти' : 'зарегистрироваться сейчас!'}
                                </a>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default LoginPage;
