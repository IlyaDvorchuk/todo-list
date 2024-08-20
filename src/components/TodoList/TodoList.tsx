import {FC, useEffect, useState} from 'react';
import TodoItem from '../TodoItem/TodoItem';
import Loader from '../Loader/Loader';
import styles from './TodoList.module.scss';
import {Todo} from "../../store/reducers/Todos/TodosTypes";
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useFetchTodosQuery,
    useUpdateTodoMutation
} from "../../services/todoApi";

const TodoList: FC = () => {
    const { data: todos, error, isFetching } = useFetchTodosQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [text, setText] = useState('');

    const handleAddTodo = async () => {
        if (text.trim()) {
            await addTodo({
                id: Date.now().toString(),
                text,
                completed: false,
            }).unwrap();
            setText('');
        }
    };

    const handleToggleTodo = async (todo: Todo) => {
        console.log('updateTodo', updateTodo)
        await updateTodo({ ...todo, completed: !todo.completed }).unwrap();
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id).unwrap();
    };

    return (
        <div className={styles.todoList}>
            <div className={styles.todoInput}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new task"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            {isFetching ? (
                <Loader />
            ) : error ? (
                <div>Error occurred</div>
            ) : (
                todos?.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => handleToggleTodo(todo)}
                        onDelete={() => handleDeleteTodo(todo.id)}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;
