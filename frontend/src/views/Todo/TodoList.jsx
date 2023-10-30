import React, { useState } from 'react'
import './todo.css';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import useAxios from '../../utils/useAxios';
import TodoForm from './TodoForm';
import TodoEdit from './TodoEdit';
import Todo from './Todo';

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [todoId, setTodId] = useState()
    const [edit, setEdit] = useState(false)
    const url = "http://127.0.0.1:8000/api/v1/todos/task-list/"
    const api = useAxios();
    const { data: data, isLoading, isError, error, refetch } = useQuery(["cat"],
        () => {
            return api.get(url)
                .then(
                    (res) => setTodos(res.data)
                );
        }
    );

    const deleteTaskMutation = useMutation(async (taskId) => {
        const response = await api.delete(`http://127.0.0.1:8000/api/v1/todos/task-detail/${taskId}`);
        return response.data;
    });
    const handleDelete = (taskId) => {
        // Filter out the task with the given taskId
        const updatedTodos = todos.filter((item) => item.id !== taskId);

        // Update the state with the new array
        setTodos(updatedTodos);

        deleteTaskMutation.mutate(taskId);
    };

    // ================================= Update ========================================================
    const handleIsEdit = (todoId) => {
        setEdit(!edit)

    }
    // const isEditing = false
    const handleEditTodo = (id) => {
        // setTodos(todos.filter((todo) => todo.id !== id));
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
        // console.log('hii');
    };


    if (isLoading) { return (alert("Loading ...")) };

    if (isError) {
        return
        alert(`${error.message}`)
    }

    

    return (
        <div style={{ marginTop: "100px" }} >


            <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
                {/* App title section */}
                <div className="row m-1 p-4">
                    <div className="col">
                        <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
                            <u>Task</u>
                        </div>
                    </div>
                </div>
                {/* Create todo section */}



                <TodoForm
                    todos={todos}
                    setTodos={setTodos}
                />
                <div className="p-2 mx-4 border-black-25 border-bottom" />

                <div className="row mx-1 px-5 pb-3 w-80">
                    <div className="col mx-auto">
                        {/* Todo Item 1 */}

                        {
                            todos.map((item, index) => {
                                return item.isEditing ? (
                                    <TodoEdit
                                        key={item.id}
                                        task={item}
                                        handleEditTodo={handleEditTodo}
                                        todos={todos}
                                        setTodos={setTodos}
                                    />
                                ) : (

                                    <Todo item={item}
                                        key={index}
                                        handleDelete={handleDelete}
                                        handleEditTodo={handleEditTodo}
                                        todos={todos}
                                        setTodos={setTodos}
                                    />
                                )
                            })

                        }
                    </div>
                </div>

                {/* <TodoEdit /> */}
                {/* } */}
            </div>

        </div>
    )
}
