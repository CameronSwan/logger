import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';

const Analysis = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [bmDates, setBMDates] = useState([]);


    const bmCount = bowelmovements.length

    const bmCountPerDay = bmDates.reduce((bmsByDay, bmDate) => {
        if (!bmsByDay[bmDate]) {
            bmsByDay[bmDate] = 0;
        }
        bmsByDay[bmDate]++
        return bmsByDay
    }, {});

    const bmCountPerDaySorted = Object.entries(bmCountPerDay).sort(([, a], [, b]) => a - b).reverse()

    const bmDaysCount = Object.keys(bmCountPerDay).length;

    const highestBmCountDate = Object.keys(bmCountPerDay).reduce((a, b) => bmCountPerDay[a] > bmCountPerDay[b] ? a : b, {});

    const highestBmCountPerDay = bmCountPerDay[highestBmCountDate]

    console.log(bmCountPerDaySorted)
    console.log(highestBmCountDate)
    //console.log(Object.keys(bmCountPerDay).find(day => bmCountPerDay[day] === highestBmCountPerDay))

    console.log(Object.keys(bmCountPerDay).filter(count => bmCountPerDay[count] === highestBmCountPerDay))
    
    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })
    }, [])


    return (
        <div className='outside-spacing analysis'>
            <h1 className='underlined bottom-spacing'>Analysis</h1>
            <div className='analysis__counts'>
                <div>
                    <div>{bmCount}</div>
                    <span className='label'>Entries Recorded </span>
                </div>
                
                <div>
                    <div>{bmDaysCount}</div>
                    <span className='label'>Days Recorded</span>
                </div>
            </div>
        </div>
    )
}

export default Analysis;