import {createSlice} from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {
        set: (state, action) => {
            state.categories = action.payload;
        }
    },
})
export const {push, remove, set} = categorySlice.actions

export default categorySlice.reducer
