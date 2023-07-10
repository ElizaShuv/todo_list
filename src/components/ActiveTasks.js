import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskBlock from './TaskBlock';

const ActiveTasks = () => {
    const [taskBlocks, setTaskBlocks] = useState([]);

    const generateUniqueId = () => {
        return Math.random().toString(36).substring(7);
    };

    const handleAddTaskBlock = () => {
        const newTaskBlock = { id: generateUniqueId(), tasks: [] };
        setTaskBlocks([...taskBlocks, newTaskBlock]);
    };

    const handleRemoveTaskBlock = (taskId) => {
        const updatedTaskBlocks = taskBlocks.filter((taskBlock) => taskBlock.id !== taskId);
        setTaskBlocks(updatedTaskBlocks);
    };

    return (
        <>
            {taskBlocks.length > 0 ? (
                <Space direction="horizontal" size="large" wrap>
                    {taskBlocks.map((taskBlock) => (
                        <TaskBlock
                            key={taskBlock.id}
                            taskBlock={taskBlock}
                            onDelete={handleRemoveTaskBlock}
                        />
                    ))}
                </Space>
            ) : (
                <div>Нет активных задач</div>
            )}
            <Button
                type="primary"
                onClick={handleAddTaskBlock}
                shape="circle"
                icon={<PlusOutlined />}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                    width: '60px',
                    height: '60px',
                }}
            />
        </>
    );
};

export default ActiveTasks;
