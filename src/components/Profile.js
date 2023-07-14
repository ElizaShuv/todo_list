import React from 'react';
import { Button, Card, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, email } = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
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
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h2>Профиль</h2>
                        <p>Логин: {username}</p>
                        <p>Почта: {email}</p>
                        <Button type="primary" onClick={handleLogout}
                                style={{
                                    background: 'black',
                                    fontWeight: 'bold',
                                }}
                        >
                            Выйти
                        </Button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Profile;
