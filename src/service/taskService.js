import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import authHeader from "./auth-header";
import { set } from "../slices/taskSlice";


const API_URL = '/tasks';

export const createTask = (category_id, task, dispatch) => {
    const url = `/tasks?categoryId=${category_id}`;

    return axios.post(url, task, { headers: authHeader() }).then(
        () => {
            return getTasksFromCategory(category_id, dispatch);
        },
        (error) => {
            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);
            throw error;
        }
    );
};

export const getAllTasks = (dispatch) => {
    return axios
        .get(API_URL, { headers: authHeader() })
        .then(
            (response) => {
                dispatch(set(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(set([]));
                throw error;
            }
        );
};

export const getTasksFromCategory = (category_id, dispatch) => {
    return axios
        .get(API_URL + `/${category_id}`, { headers: authHeader() })
        .then(
            (response) => {
                dispatch(set(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(set([]));
                throw error;
            }
        );
};

export const getTask = (dispatch) => {
    return axios.get(API_URL, { headers: authHeader() })
        .then((response) => {
            dispatch(set(response.data));
            return response.data;
        })
        .catch((error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);

            dispatch(set([]));
            throw error;
        });
};

export const deleteTask = (id, dispatch) => {
    return axios
        .delete(API_URL + `/${id}`, { headers: authHeader() })
        .then((response) => {
            getTask(dispatch);
            return response.data;
        })
        .catch((error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);
            throw error;
        });
};

const taskService = {
    getTask,
    createTask,
    deleteTask,
};

export default taskService;
