import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {initialState} from "./TodosState";

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchTodosStart(state) {
            state.loading = true;
        },
        fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
            state.items = action.payload;
            state.loading = false;
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.items.push(action.payload);
        },
        updateTodo(state, action: PayloadAction<Todo>) {
            const index = state.items.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteTodo(state, action: PayloadAction<string>) {
            state.items = state.items.filter(todo => todo.id !== action.payload);
        },
    },
});

export const { fetchTodosStart, fetchTodosSuccess, addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
