import React from 'react';
import { toast } from 'react-toastify';
import Calander from './Calander';

const Task = () => {

    const handleTask = event => {
        event.preventDefault();
        const tasks = event.target.tasks.value;
        console.log(tasks)

        const setGoal = {
            tasks: event.target.tasks.value
        }
        event.target.reset();
        //its time to Fetch for SENT data to server
        fetch('http://localhost:5000/deadline', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(setGoal)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Task added!')
                }
                else {
                    toast.error('Set task failed')
                }
            });
    }
    return (
        <div className='flex justify-center gap-6'>
            <div>
            <h1 className='stat-value text-secondary m-4 text-center'>Today Your Goal</h1>
             <form onSubmit={handleTask} className='grid grid-cols-1 gap-4 justify-items-center my-5 text-secondary'>
            <div className="form-control">
              </div>
                <input type="text" name='tasks' required
                    placeholder="Set your tasks" className="input input-bordered" />
                <input type="submit" value="Set" className="btn btn-secondary text-white" />

            </form>
            </div>
            <Calander></Calander>
        </div>
    );
};

export default Task;