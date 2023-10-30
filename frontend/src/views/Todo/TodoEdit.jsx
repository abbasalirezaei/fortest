import React, { useState } from 'react'
import useAxios from '../../utils/useAxios';
import { useMutation } from 'react-query';

export default function TodoEdit({ editTodo, task, handleEditTodo, setTodos, todos }) {
    const [todo, setTodo] = useState(task.title)
    const api = useAxios()

    const editTaskMutation = useMutation(async (updatedTask) => {
        const response = await api.put(`http://127.0.0.1:8000/api/v1/todos/task-detail/${updatedTask.id}/`, updatedTask);
        return response.data;
    });

    const handleEdit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task, title: todo, isEditing: false
        }
        editTaskMutation.mutate(updatedTask);

        setTodos(
            todos.map((item) =>
                item.id === task.id ? { ...item, title:todo ,isEditing: false } : item
            )
        );
    };
   

    return (
        <form onSubmit={handleEdit}>
            <div className="row m-1 p-3">
                <div className="col col-11 mx-auto">
                    <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                        <div className="col">
                            <input
                                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                                type="text"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            // placeholder=""
                            />
                        </div>
                        <div className="col-auto px-0 mx-0 mr-2">
                            <button type="submit" className="btn btn-primary btn-sm">
                                Update
                            </button>


                        </div>
                        <div className="col-auto m-1 p-0 todo-actions">
                            <button
                                className='btn btn-info btn-sm'
                                onClick={() => handleEditTodo(task.id)}
                            > No Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
