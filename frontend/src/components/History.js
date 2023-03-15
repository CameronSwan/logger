import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { BowelMovement } from './BowelMovement';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
//import 'react-calendar/dist/Calendar.css';

const History = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [date, setDate] = useState(new Date());
    const [bmDates, setBMDates] = useState([])
    const [showYear, setShowYear] = useState(false);
    const [view, setView] = useState('month')
    const [dateSelection, setDateSelection] = useState(new Date().toLocaleString('sv').split(' ')[0]);

    const bmByDateCount = bowelmovements.filter(bm => bm.date == dateSelection).length


    const monthTileContent = (({ date, view }) => (view === 'month' && bmDates.includes(date.toLocaleString('sv').split(' ')[0]) === true ? <span>&#128169;</span> : <span></span>))

    console.log(bmDates)
    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })
       
    }, [])

    const handleShowYear = () => {
        setShowYear(!showYear)
        showYear ? setView('month') : setView('year')
    }

    const handleDateChange = (e) => {
        setDate(e)
        setDateSelection(new Date(e).toLocaleString('sv').split(' ')[0])
        console.log(dateSelection)
    }

    const handleMonthChange = (e) => {
        setDate(e)
        console.log(e.toLocaleString('sv').split(' ')[0])
        handleShowYear()
    }

    return (
        <div className='history'>
            <h1 className='underlined'>History</h1>
            <div>
                <label className='toggle-month-year'>
                    <input type='checkbox'
                        id='toggle'
                        role='switch'
                        value={showYear}
                        onChange={handleShowYear}
                        title='Toggle Month Year'
                    />
                    <span className='toggle-month-year__slider'></span>
                    <span className='toggle-month-year__labels small'></span>
                </label>
            </div>

            <Calendar
                value={date}
                onClickDay={handleDateChange}
                onClickMonth={handleMonthChange}
                view={view}
                calendarType='US'
                tileContent={ ({ date, view }) => (view === 'month' && bmDates.includes(date.toLocaleString('sv').split(' ')[0]) === true ? <span>&#128169;</span> : <span></span> )}
                prev2Label={null}
                next2Label={null}
                maxDate={new Date()}
                nextLabel='→'
                prevLabel='←'
            />

            <h2 className='history__date label underlined'>{date.toDateString()}</h2>
            <div className='history__results'>
                {
                    bmByDateCount === 0 && <p>No bowel movements recorded.</p>
                }
                {
                    bowelmovements.filter(bm => bm.date === dateSelection).map(bowelmovement => {
                        return (
                            <BowelMovement
                                key={bowelmovement._id}
                                bm={bowelmovement}
                            />
                        )
                    })
                }
            </div>

            <div className='history__button-row'>
                <Link to='/bowelmovement/create' rel='path' state={{ preSelectedDate: dateSelection }} className='button button--link button--submit button__new-entry cta'>New Entry</Link>
            </div>
        </div>
    )
}

export default History;