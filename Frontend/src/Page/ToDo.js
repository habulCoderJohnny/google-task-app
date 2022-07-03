import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ToDo = () => {
    const { id } = useParams();
    const [goal, setGoal] = useState([]);
    useEffect(() => {
        fetch('https://daily-task-db.herokuapp.com/showToDoList')
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
        const url =  `https://daily-task-db.herokuapp.com/update/${id}`;

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
        const confirmation = window.confirm('Do YOU Complete The task?');
        if (confirmation) {
            fetch(`https://daily-task-db.herokuapp.com/taskComplete/${id}`, {
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
                goal.map((task,index )=>
                    <div key={task._id} className="font-bold text-xl my-2"> <span className="text-green-500 text-2xl">{index + 1}.</span> {task.tasks}
                    <span className="text-red-500 text-2xl"> On {task.date}</span><button onClick={() => handleComplete(task._id)} className='btn btn-outline btn-sm ml-3'><FontAwesomeIcon className="text-white" icon={faCircleCheck} />Complete</button>
                    </div>
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
                        <h3 className="font-bold text-lg text-secondary text-center my-3">Update or reset your task
                        </h3>
                        <form onSubmit={handleUpdateTask} className='grid grid-cols-1 gap-4 justify-items-center'>

                            {goal.map(task => <div> <input defaultValue={task.tasks}
                                type="text" name='reTask' className="input input-bordered w-full max-w-xs" required />
                                </div>
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