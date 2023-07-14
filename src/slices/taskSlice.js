import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        set: (state, action) => {
            state.tasks = action.payload;
        },
        push: (state, action) => {
            state.tasks.push(action.payload);
        },
        remove: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
    },
});

export const { push, remove, set } = taskSlice.actions;

export default taskSlice.reducer;

