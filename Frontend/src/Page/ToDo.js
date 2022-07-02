import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ToDo = () => {
    const { id } = useParams();
    const [goal, setGoal] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/showToDoList')
            .then(res => res.json())
            .then(data => setGoal(data))
    }, []);

    //UPDATE kaj
    const handleUpdateTask = event => {
        event.preventDefault();
        const reTask = event.target.reTask.value;
        console.log(reTask)

        const updateTask = {
            reTask: event.target.reTask.value
        }
        event.target.reset();
        const url =  `http://localhost:5000/update/${id}`;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updateTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Task updated!')
                    window.location.reload();
                }
                else {
                    toast.error('update task failed')
                }
            });

    }

    const handleComplete = id => {
        const confirmation = window.confirm('do u complete the task');
        if (confirmation) {
            fetch(`http://localhost:5000/taskComplete/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Welldone Task Complete successfully!')
                        const remaining = goal.filter(t => t._id !== id);
                        setGoal(remaining);
                    }

                    else {
                        toast.error('failed')
                    }
                    // window.location.reload();
                });

        }

    }

    return (
        <div className='text-center'>
            <h1 className='stat-value text-secondary m-4'>Your all task: <span className='stat-value text-red-500'>{goal.length}</span></h1>

            {
                goal.map(task =>
                    <li key={task._id} className="">{task.tasks}
                    </li>
                )
            }
            <label htmlFor="task-modal"
                className="btn btn-sm text-white bg-gradient-to-r from-red-500 via-blue-600 to-blue-700 m-2">Edit task</label>

            {/* MODAL SECTION  */}
            <div>
                <input type="checkbox" id="task-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle pt-20">
                    <div className="modal-box">
                        <label htmlFor="task-modal" className="btn bg-[#0c55b6] btn-sm btn-circle absolute right-8 top-5">✕</label>
                        <h3 className="font-bold text-lg text-secondary text-center">update or change your task
                        </h3>
                        <form onSubmit={handleUpdateTask} className='grid grid-cols-1 gap-4 justify-items-center'>

                            {goal.map(task => <div> <input defaultValue={task.tasks}
                                type="text" name='reTask' className="input input-bordered w-full max-w-xs" required />
                                <button onClick={() => handleComplete(task._id)} className='btn btn-success btn-sm mt-2'>COMPLETE</button></div>
                            )}

                            <input type="submit" value="Update" className="btn btn-sm text-white bg-gradient-to-r from-red-500 via-blue-600 to-blue-700" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;