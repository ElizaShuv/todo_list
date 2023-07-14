import React, { useEffect, useState } from 'react';
import {Card, Checkbox, Button, Input, Space, Typography, Tooltip, message} from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined,
    CheckOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import categoryService, {
    deleteCategory,
    getCategory,
    updateCategory,
} from '../service/categoryService';
 import { remove } from '../slices/categorySlice';


const { Text } = Typography;

const TaskBlock = ({ taskBlock }) => {
    const [editingId, setEditingId] = useState();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState();

    const generateUniqueId = () => {
        return Math.random().toString(36).substring(7);
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleAdd = () => {
        const newTask = {id: generateUniqueId(), task: '', checked: false};
        setTasks([...tasks, newTask]);
        setEditingId(newTask.id);
    };

    const handleRemove = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setEditingId(null);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        categoryService.getCategory(dispatch);
    }, []);

    const handleRemoveCard = () => {
        deleteCategory(taskBlock.id, dispatch)
            .then(() => {
                dispatch(remove(taskBlock.id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (id, e) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {...task, task: e.target.value};
                }
                return task;
            })
        );
    };

    const handleDescriptionChange = (id, e) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {...task, description: e.target.value};
                }
                return task;
            })
        );
    };

    const handleCheckboxChange = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {...task, checked: !task.checked};
                }
                return task;
            })
        );
    };

    const handleTitleChange = (value) => {
        setTitle(value);
        const updatedCategory = {...taskBlock, category: value};
        updateCategory(taskBlock.id, updatedCategory, dispatch)
            .then(() => {
                getCategory(dispatch);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const completedTasks = tasks.filter((task) => task.checked === true);
    const uncompletedTasks = tasks.filter((task) => task.checked === false);

    return (
        <Card hoverable style={{width: 550}}>
            <Typography.Title
                editable={{
                    onChange: handleTitleChange,
                }}
                level={3}
                style={{
                    margin: '5px 0 10px',
                }}
            >
                {taskBlock.category}
            </Typography.Title>
            <Button
                shape="circle"
                icon={<DeleteOutlined/>}
                onClick={handleRemoveCard}
                style={{position: 'absolute', top: 8, right: 8}}
            />
            {uncompletedTasks.map((task) => (
                <div key={task.id}>
                    <Space style={{display: 'flex', marginBottom: 8}} align="baseline">
                        <Tooltip title={task.description}>
                            <InfoCircleOutlined style={{marginRight: 8}}/>
                        </Tooltip>
                        {editingId === task.id ? (
                            <div>
                                <Input.TextArea
                                    value={task.task}
                                    onChange={(e) => handleInputChange(task.id, e)}
                                    onPressEnter={() => setEditingId(null)}
                                    autoFocus
                                    style={{width: 300}}
                                />
                                <Input.TextArea
                                    value={task.description}
                                    onChange={(e) => handleDescriptionChange(task.id, e)}
                                    onPressEnter={() => setEditingId(null)}
                                    placeholder="Описание задачи"
                                    style={{width: 300, marginTop: 8}}
                                />
                            </div>
                        ) : (
                            <Checkbox checked={task.checked} onChange={() => handleCheckboxChange(task.id)}>
                                {task.checked ? <Text delete>{task.task}</Text> : <Text>{task.task}</Text>}
                            </Checkbox>
                        )}
                        <Button
                            shape="circle"
                            icon={editingId === task.id ? <CheckOutlined/> : <EditOutlined/>}
                            onClick={() => (editingId === task.id ? setEditingId(null) : handleEdit(task.id))}
                            disabled={task.checked}
                        />
                        <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => handleRemove(task.id)}/>
                    </Space>
                </div>
            ))}

            {completedTasks.length > 0 && (
                <div>
                    <Typography.Title level={5}>Выполненные</Typography.Title>
                    {completedTasks.map((task) => (
                        <div key={task.id}>
                            <Space style={{display: 'flex', marginBottom: 8}} align="baseline">
                                <Checkbox checked={task.checked} onChange={() => handleCheckboxChange(task.id)}>
                                    <Text delete>{task.task}</Text>
                                </Checkbox>
                                <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => handleRemove(task.id)}/>
                            </Space>
                        </div>
                    ))}
                </div>
            )}

            <Button type="dashed" onClick={handleAdd} block icon={<PlusOutlined/>}>
                Добавить задачу
            </Button>
        </Card>
    );
};

    export default TaskBlock;
