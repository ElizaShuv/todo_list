import React, {useEffect, useState} from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskBlock from './TaskBlock';
import {useDispatch, useSelector} from "react-redux";
import categoryService, {getCategory} from "../service/categoryService";
import {createTask} from "../service/taskService";

const ActiveTasks = ({ createCategory }) => {
    const [setTaskBlocks] = useState([]);


    const dispatch = useDispatch();

    const handleAddTaskBlock = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newCategory = { category: 'Новая категория', user: { id: currentUserId } };
            createCategory(newCategory,dispatch).then(() => {
                getCategory(dispatch);
            })
        } else {
        }
    };

    useEffect(() => {
        categoryService.getCategory(dispatch)
    }, []);

    const handleRemoveTaskBlock = (taskId) => {
        const updatedTaskBlocks = taskBlocks.filter((taskBlock) => taskBlock.id !== taskId);
        setTaskBlocks(updatedTaskBlocks);
    };

    const taskBlocks = useSelector((state) => state.category.categories);
    return (
        <>
            {taskBlocks.length > 0 ? (
                <Space direction="horizontal" size="large" wrap>
                    {taskBlocks.map((taskBlock) => (
                        <TaskBlock
                            key={taskBlock.id}
                            taskBlock={taskBlock}
                            onDelete={handleRemoveTaskBlock}
                            createTask={createTask}
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
                    background: 'black',
                    fontWeight: 'bold',
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
