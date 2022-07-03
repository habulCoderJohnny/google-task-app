import React, { useState }  from 'react';
import { toast } from 'react-toastify';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const Task = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(new Date());
    let footer = <p>Please pick a your task day.</p>;
    if (selected) {
        footer = <p>You Task on <span className="text-2xl font-bold text-pink-500">{format(selected, 'PP')}</span></p>;
      }
      const formattedDate = format(selected , 'PP');

    const handleTask = event => {
        event.preventDefault();
        const tasks = event.target.tasks.value;
        console.log(tasks)

        const setGoal = {
            date: formattedDate,
            tasks: event.target.tasks.value
        }
        event.target.reset();
        //its time to Fetch for SENT data to server
        fetch('https://daily-task-db.herokuapp.com/deadline', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(setGoal)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`'${tasks}  'Task Set on '${formattedDate}'`)
                    navigate('/to-do-list')
                }
                else {
                    toast.error('Set task failed')
                }
            });

    }
    return (
        <div className='hero-content flex-col lg:flex-row gap-6'>
            <div>
            <h1 className='stat-value text-secondary m-4 text-center'>Today Your Goal</h1>
             <form onSubmit={handleTask} className='grid grid-cols-1 gap-4 justify-items-center my-5 text-secondary'>
            <div className="form-control">
              </div>
              <input type="text" value={format(selected, 'PP')} disabled className="input input-bordered w-full max-w-xs" />
                <input type="text" name='tasks' required
                    placeholder="Set your tasks" className="input input-bordered w-full max-w-xs" />
                <input type="submit" value="Set" className="btn btn-secondary text-white" />

            </form>
            </div>

            {/* DayPicker */}
                        
            <div>
                <DayPicker
                mode='single'
                selected={selected}
                onSelect={setSelected}
                footer={footer}
                styles={{
                    caption: { color: 'red' }
                  }}
                />
                </div>
        
        </div>
    );
};

export default Task;