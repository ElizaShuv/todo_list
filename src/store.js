import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import taskReducer from "./slices/taskSlice";

export default configureStore({
    reducer: {
       category: categoryReducer,
        auth: authReducer,
        task: taskReducer,
    },
})