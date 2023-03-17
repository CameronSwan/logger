import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { BowelMovementTab } from './BowelMovementTab';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';

const History = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [date, setDate] = useState(new Date());
    const [bmDates, setBMDates] = useState([])
    const [showYear, setShowYear] = useState(false);
    const [view, setView] = useState('month'); // Calendar View as Month or Year
    const [dateSelection, setDateSelection] = useState(new Date().toLocaleString('sv').split(' ')[0]);

    // Count bowel movements by date.
    const bmByDateCount = bowelmovements.filter(bm => bm.date == dateSelection).length

    // Count bowel movements by month
    const bmByMonthCount = bmDates.reduce((bmsByYearMonth, bm) => {
        const yearMonth = bm.substring(0, 7); // e.g. 2023-03
        if (!bmsByYearMonth[yearMonth]) {
            bmsByYearMonth[yearMonth] = 0;
        }
        bmsByYearMonth[yearMonth] ++
        return bmsByYearMonth
    }, {});

    // Display info on Calendar Tiles based on data provided:
    const CalendarTileContent = (({ date, view }) => {
        // In month view, show a poop emoji on days with bowel movement entries
        if (view === 'month') {
            return bmDates.includes(date.toLocaleString('sv').split(' ')[0]) === true ? <span>&#128169;</span> : <span></span>
        }
        // In year view, show count on months with bowel movement entries
        if (view === 'year') {
            return (bmByMonthCount.hasOwnProperty(date.toLocaleString('sv').split(' ')[0].substring(0, 7)) === true) ? <span>&#128169; x {bmByMonthCount[date.toLocaleString('sv').split(' ')[0].substring(0, 7)]}</span> : <span></span>
        }
    })

    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })
    }, [])

    const handleShowYear = () => {
        setShowYear(!showYear)
        showYear ? setView('month') : setView('year')
        showYear ?? setDate(new Date());
        setDateSelection(new Date().toLocaleString('sv').split(' ')[0])
    }

    const handleDateChange = (e) => {
        setDate(e)
        setDateSelection(new Date(e).toLocaleString('sv').split(' ')[0])
    }

    const handleMonthChange = (e) => {
        handleShowYear()
        handleDateChange(e)
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
                prev2Label={null}
                next2Label={null}
                maxDate={new Date()}
                nextLabel='→'
                prevLabel='←'
                tileContent={CalendarTileContent}
            />

            {view === 'month' && <h2 className='history__date label underlined'>{date.toDateString()}</h2>}
            {view === 'month' && <div className='history__results'>
                {
                    bmByDateCount === 0 && <p>No bowel movements recorded.</p>
                }
                {
                    bowelmovements.filter(bm => bm.date === dateSelection).map(bowelmovement => {
                        return (
                            <BowelMovementTab
                                key={bowelmovement._id}
                                bm={bowelmovement}
                            />
                        )
                    })
                }
            </div>}

            <div className='history__button-row'>
                <Link to='/bowelmovement/create' rel='path' state={{ preSelectedDate: dateSelection }} className='button button--link button--submit button__new-entry cta'>New Entry</Link>
            </div>
        </div>
    )
}

export default History;