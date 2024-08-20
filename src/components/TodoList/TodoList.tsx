import {FC, useState} from 'react';
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
import Button from "../Button/Button";

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
            });
            setText('');
        }
    };

    const handleToggleTodo = async (todo: Todo) => {
        await updateTodo({ ...todo, completed: !todo.completed });
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
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
                <Button text={'Add'} onClick={handleAddTodo}/>
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
