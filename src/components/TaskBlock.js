import React, { useState } from 'react';
import { Card, Checkbox, Button, Input, Space, Typography } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined,
    CheckOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const TaskBlock = ({ taskBlock, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('Новый список');

    const generateUniqueId = () => {
        return Math.random().toString(36).substring(7);
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleAdd = () => {
        const newTask = { id: generateUniqueId(), task: '', checked: false };
        setTasks([...tasks, newTask]);
        setEditingId(newTask.id);
    };

    const handleRemove = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setEditingId(null);
    };

    const handleRemoveCard = () => {
        onDelete(taskBlock.id);
    };

    const handleInputChange = (id, e) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, task: e.target.value };
                }
                return task;
            })
        );
    };

    const handleCheckboxChange = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, checked: !task.checked };
                }
                return task;
            })
        );
    };

    const handleTitleChange = (value) => {
        setTitle(value);
    };

    const completedTasks = tasks.filter((task) => task.checked);
    const uncompletedTasks = tasks.filter((task) => !task.checked);

    return (
        <Card hoverable style={{ width: 550 }}>
            <Typography.Title
                editable={{
                    onChange: handleTitleChange,
                }}
                level={3}
                style={{
                    margin: '5px 0 10px',
                }}
            >
                {title}
            </Typography.Title>
            <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={handleRemoveCard}
                style={{ position: 'absolute', top: 8, right: 8 }}
            />
            {uncompletedTasks.map((task) => (
                <div key={task.id}>
                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        {editingId === task.id ? (
                            <Input.TextArea
                                value={task.task}
                                onChange={(e) => handleInputChange(task.id, e)}
                                onPressEnter={() => setEditingId(null)}
                                autoFocus
                                style={{ width: 300 }}
                            />
                        ) : (
                            <Checkbox
                                checked={task.checked}
                                onChange={() => handleCheckboxChange(task.id)}
                            >
                                {task.checked ? (
                                    <Text delete>{task.task}</Text>
                                ) : (
                                    <Text>{task.task}</Text>
                                )}
                            </Checkbox>
                        )}
                        <Button
                            shape="circle"
                            icon={editingId === task.id ? <CheckOutlined /> : <EditOutlined />}
                            onClick={() => (editingId === task.id ? setEditingId(null) : handleEdit(task.id))}
                            disabled={task.checked}
                        />
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemove(task.id)}
                        />
                    </Space>
                </div>
            ))}

            {completedTasks.length > 0 && (
                <div>
                    <Typography.Title level={5}>Выполненные</Typography.Title>
                    {completedTasks.map((task) => (
                        <div key={task.id}>
                            <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Checkbox
                                    checked={task.checked}
                                    onChange={() => handleCheckboxChange(task.id)}
                                >
                                    <Text delete>{task.task}</Text>
                                </Checkbox>
                                <Button
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemove(task.id)}
                                />
                            </Space>
                        </div>
                    ))}
                </div>
            )}

            <Button type="dashed" onClick={handleAdd} block icon={<PlusOutlined />}>
                Добавить задачу
            </Button>
        </Card>
    );
};

export default TaskBlock;