import React, {useEffect, useState} from 'react';
import { UnorderedListOutlined, CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import {Avatar, Layout, Menu, theme} from 'antd';

import ActiveTasks from "../components/ActiveTasks";
import TaskBlock from '../components/TaskBlock';

import './Pages.css'

import { useDispatch } from 'react-redux';
import categoryService, { getCategory, createCategory, deleteCategory } from '../service/categoryService';
import MyComponent from "../components/MyComponent";
import {createTask} from "../service/taskService";
import Profile from "../components/Profile";


const { Header, Content, Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: 'Профиль',
    },
    {
        key: '2',
        icon: React.createElement(UnorderedListOutlined),
        label: 'Активные задачи',
    },
    {
        key: '3',
        icon: React.createElement(CarryOutOutlined),
        label: 'Архив',
    },
];

const MainApp = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch();

    useEffect(() => {
        categoryService.getCategory(dispatch)
    }, []);

    const [activeSection, setActiveSection] = useState('2');
    const [taskBlocks, setTaskBlocks] = useState([]);

    const handleMenuClick = ({ key }) => {
        setActiveSection(key);
    };

    const addTaskBlock = () => {
        setTaskBlocks([...taskBlocks, <TaskBlock key={taskBlocks.length} deleteCategory={deleteCategory} createCategory={createCategory} createTask={createTask} />]);
    };


    const removeTaskBlock = (taskId) => {
        const updatedTaskBlocks = taskBlocks.filter((taskBlock) => taskBlock.id !== taskId);
        setTaskBlocks(updatedTaskBlocks);
    };



    return (
        <Layout>
            <Header
                className="gradient-layout"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '24px',
                    backgroundColor: 'black',
                }}
            >
                <Avatar src="/logo.png" size={40} icon={<UserOutlined />} style={{ marginRight: '10px' }} shape="square" />
                ToDoList
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        onClick={handleMenuClick}
                        selectedKeys={[activeSection]}
                    >
                        {items2.map((item) => (
                            <Menu.Item
                                key={item.key}
                                style={{
                                    backgroundColor: activeSection === item.key ? 'grey' : 'inherit',
                                }}
                            >
                                {item.title}
                            </Menu.Item>
                        ))}
                    </Menu>
                    <style>
                        {`
              .ant-menu-item-selected {
                background-color:   rgb(166, 201, 184) !important;
                color: black !important;
              }
            `}
                    </style>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ flex: 1, padding: '24px', minHeight: 0, background: 'lightgrey' }}>
                        {activeSection === '2' && (
                            <ActiveTasks
                                createCategory={createCategory}
                                taskBlocks={taskBlocks}
                                addTaskBlock={addTaskBlock}
                                removeTaskBlock={removeTaskBlock}
                            />
                        )}
                        {activeSection === '3' && <div>Архивные задачи</div>}
                        {activeSection === '1' && <Profile />}
                    </Content>
                    <MyComponent />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default MainApp;