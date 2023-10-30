import React from 'react'
import { useMutation } from 'react-query';
import useAxios from '../../utils/useAxios';

export default function Todo({ item, handleDelete, handleEditTodo, setTodos, todos }) {
    // const url = "http://127.0.0.1:8000/api/v1/todos/task-list/"
    const api = useAxios();
    const toggleCompletionMutation = useMutation(async () => {
        const response = await api.patch(`http://127.0.0.1:8000/api/v1/todos/task-detail/${item.id}/`);
        return response.data;
    });

    const handleToggleCompletion = () => {
        toggleCompletionMutation.mutate();
        setTodos(
            todos.map((task) =>
                task.id === item.id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div>
            <div className="row px-3 align-items-center todo-item rounded">
                <div className="col-auto m-1 p-0 d-flex align-items-center">
                    <h2 className="m-0 p-0">
                        <i
                            className="fa fa-square-o text-primary btn m-0 p-0 d-none"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Mark as complete"
                        />
                        <i
                            className="fa fa-check-square-o text-primary btn m-0 p-0"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Mark as todo"
                        />
                    </h2>
                </div>
                <div className={`col px-1 m-1 d-flex align-items-center ${item.completed ? 'text-muted' : 'font-weight-bold'}`}>
                    <p>{item.title}</p>
                </div>
                <div className="col-auto m-1 p-0 px-3 d-none"></div>

                <div className="col-auto m-1 p-0 todo-actions">
                    <button
                        className='btn btn-primary'
                        onClick={() => handleToggleCompletion(item.id, !item.completed)
                        }
                    >
                        {!item.completed ? "Complete" : "UnComplete"}
                    </button>
                </div>

                {
                    !item.completed && <div className="col-auto m-1 p-0 todo-actions">
                        <button
                            className='btn btn-info'
                            onClick={() => handleEditTodo(item.id)}
                        > Edit</button>
                    </div>
                }

                <div className="col-auto m-1 p-0 todo-actions">
                    <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(item.id)}
                    >
                        {/* <i className="fa fa-check-circle text-success mr-2"></i> */}
                        Delete
                    </button>
                </div>

            </div>

        </div>
    )
}
