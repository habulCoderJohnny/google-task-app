import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calander = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div className=''>
            
            <div>
                <DayPicker
                mode='single'
                selected={date}
                onSelect={setDate}
                styles={{
                    caption: { color: 'red' }
                  }}
                />
                </div>
        </div>
    );
};

export default Calander;