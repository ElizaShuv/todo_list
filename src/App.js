import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme} from 'antd';
import ActiveTasks from "./components/ActiveTasks";
import TaskBlock from './components/TaskBlock';
import ProfileComponent from "./components/Profile";

const { Header, Content, Sider } = Layout;
const items2 = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: 'Профиль',
    },
    {
        key: '2',
        icon: React.createElement(LaptopOutlined),
        label: 'Активные задачи',
    },
    {
        key: '3',
        icon: React.createElement(NotificationOutlined),
        label: 'Архив',
    },
];

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [activeSection, setActiveSection] = useState('2');
    const [taskBlocks, setTaskBlocks] = useState([]);

    const handleMenuClick = ({ key }) => {
        setActiveSection(key);
    };

    const addTaskBlock = () => {
        setTaskBlocks([...taskBlocks, <TaskBlock key={taskBlocks.length} />]);
    };

    const removeTaskBlock = (taskId) => {
        const updatedTaskBlocks = taskBlocks.filter((taskBlock) => taskBlock.id !== taskId);
        setTaskBlocks(updatedTaskBlocks);
    };



    return (
        <Layout>
            <Header style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '24px',
            }}>
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
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ flex: 1, padding: '24px', minHeight: 0 }}>
                        {activeSection === '2' && <ActiveTasks
                            taskBlocks={taskBlocks}
                            addTaskBlock={addTaskBlock}
                            removeTaskBlock={removeTaskBlock}
                        />}
                        {activeSection === '3' && <div>Архивные задачи</div>}
                        {activeSection === '1' && <div>Профиль
                            <ProfileComponent/></div>}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;