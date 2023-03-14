import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { BowelMovement } from './BowelMovement';
const History = () => {
    const [bowelmovements, setBowelmovements] = useState([])
    const [dateSelection, setDateSelection] = useState(new Date().toLocaleString('sv').split(' ')[0])


    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            console.log(bowelmovements)
        })
    }, [])

    const handleDateChange = (e) => {
        setDateSelection(e.target.value)
        console.log(dateSelection)
    }

    return (
        <div>
            <div>
                <input type='date' id='datePicker' name='date'
                    max={new Date().toLocaleString('sv').split(' ')[0]}
                    value={dateSelection}
                    onChange={handleDateChange}
                    className='form__text-input' />
            </div>
            {bowelmovements.filter(bm => bm.date == dateSelection).map(bowelmovement => {
                return (
                    <BowelMovement key={bowelmovement._id}
                        bm={bowelmovement}
                    />
                )
            })}
        </div>
    )
}

export default History;