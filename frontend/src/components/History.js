import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { BowelMovement } from './BowelMovement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const History = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [date, setDate] = useState(new Date());
    const [bmDates, setBMDates] = useState([])
    const [showYear, setShowYear] = useState(false);
    const [view, setView] = useState('month')
    const [dateSelection, setDateSelection] = useState(new Date().toLocaleString('sv').split(' ')[0]);


    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm=> bm.date))
        })
    }, [])


    const handleShowYear = () => {
        
        setShowYear(!showYear)

        showYear ? setView('month') : setView('year')
        // if(showYear){
        //     setView('year')
        // } else {
        //     setView('month')
        // }
    }

    const handleDateChange = (e) => {
        setDate(e)
        setDateSelection(new Date(e).toLocaleString('sv').split(' ')[0])
        console.log(dateSelection)
    }

    return (
        <div>
            <input type='checkbox' 
                id='toggle-month-year' 
                role='switch' 
                value={showYear} 
                onChange={handleShowYear}
            />

            <Calendar
                value={date}
                onChange={handleDateChange}
                view={view}
                calendarType='ISO 8601'
                tileContent={({ date, view }) => view === 'month' && bmDates.includes(date.toLocaleString('sv').split(' ')[0]) == true ? <p>POOP</p> : null}
            />

            <p>{bmDates}</p>
            {/* <div>
                <input type='date' id='datePicker' name='date'
                    max={new Date().toLocaleString('sv').split(' ')[0]}
                    value={dateSelection}
                    onChange={handleDateChange}
                    className='form__text-input' />
            </div> */}
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