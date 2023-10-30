import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import useAxios from '../../utils/useAxios';
import { useMutation } from 'react-query';
export default function TodoForm(props) {
    const [todo, setTodo] = useState("")
    const api = useAxios()

    const createTask = useMutation(async (newTask) => {
        const response = await api.post('http://127.0.0.1:8000/api/v1/todos/task-list/', newTask, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return (response.data
        );
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            "title": todo,
        }
        createTask.mutate(form);
        props.setTodos([
            form,
            ...props.todos
        ])
        setTodo("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row m-1 p-3">
                <div className="col col-11 mx-auto">
                    <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                        <div className="col">
                            <input
                                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                                type="text"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                placeholder="Add new .."
                            />
                        </div>
                        <div className="col-auto px-0 mx-0 mr-2">
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
