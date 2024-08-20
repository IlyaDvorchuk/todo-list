import { createApi } from '@reduxjs/toolkit/query/react';
import {Todo} from "../store/reducers/Todos/TodosTypes";


const saveToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};


export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: async ({ method, body, url }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let mockTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

        const urlParts = url?.split('/');
        const id = urlParts?.length > 1 ? urlParts[urlParts.length - 1] : undefined;
        switch (method) {
            case 'GET':
                return { data: mockTodos };
            case 'POST':
                const newTodo = { ...body, id: Date.now().toString() };
                mockTodos.push(newTodo);
                saveToLocalStorage(mockTodos);
                return { data: newTodo };
            case 'PUT':
                mockTodos = mockTodos.map(todo =>
                    todo.id === body.id ? body : todo
                );
                saveToLocalStorage(mockTodos);
                return { data: body };
            case 'DELETE':
                if (id) {
                    mockTodos = mockTodos.filter(todo => todo.id !== id);
                    saveToLocalStorage(mockTodos);
                    return { data: { success: true, id } };
                } else {
                    return { error: 'ID not provided for DELETE' };
                }
            default:
                return { error: 'Method not supported' };
        }
    },
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        fetchTodos: builder.query<Todo[], void>({
            query: () => ({ method: 'GET', url: 'todos' }),
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (todo) => ({ method: 'POST', url: 'todos', body: todo }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({ method: 'PUT', url: `todos/${todo.id}`, body: todo }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({ method: 'DELETE', url: `todos/${id}` }),
            invalidatesTags: ['Todos'],
        }),
    }),
});

export const {
    useFetchTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi;
