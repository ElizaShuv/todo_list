import axios from 'axios';
import {set} from "../slices/categorySlice";
import authHeader from "./auth-header";

const API_URL = "/categories";


export const getCategory = (dispatch) => {
    return axios.get(API_URL, {headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};


export const createCategory = (category, dispatch) => { // Исправлено: добавлен параметр dispatch
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;
    if (token) {
        return axios
            .post(API_URL, category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(
                (response) => {
                    getCategory(dispatch);
                })
            .catch((error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            });
    }
};

export const deleteCategory = (id, dispatch) => { // Исправлено: добавлен параметр dispatch
    return axios
        .delete(API_URL + `/${id}`, { headers: authHeader() })
        .then(
            (response) => {
                getCategory(dispatch);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            }
        );
};

export const updateCategory = (id, category, dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;

    if (token) {
        return axios
            .put(API_URL + `/${id}`, category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(
                (response) => {
                    getCategory(dispatch);
                }
            )
            .catch((error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            });
    }
};


const categoryService = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoryService
