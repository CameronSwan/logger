import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dataService from '../services/dataService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Analysis = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [bmDates, setBMDates] = useState([]);
    const bmCount = bowelmovements.length

    const bmByDayCount = bmDates.reduce((bmsByDay, bmDate) => {
        if (!bmsByDay[bmDate]) {
            bmsByDay[bmDate] = 0;
        }
        bmsByDay[bmDate]++
        return bmsByDay
    }, {});

    const bmByDayCountSorted = Object.entries(bmByDayCount).sort(([, a], [, b]) => a - b).reverse()

    const bmDaysCount = Object.keys(bmByDayCount).length;

    const highestBmCountDate = Object.keys(bmByDayCount).reduce((a, b) => bmByDayCount[a] > bmByDayCount[b] ? a : b, {});

    const highestbmByDayCount = bmByDayCount[highestBmCountDate]

    /* Charts */
    const bmByMonth = bowelmovements.reduce((bmsByYearMonth, bm) => {
        const yearMonth = bm.date.substring(0, 7); // e.g. 2023-03
        if (!bmsByYearMonth[yearMonth]) {
            bmsByYearMonth[yearMonth] = [];
        }
        bmsByYearMonth[yearMonth].push(bm)
        return bmsByYearMonth
    }, {});

    let options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Types of Bowel Movements per Month',
            },
        },
        maintainAspectRatio: false
    };

    const labels = ['2023-03', '2023-02', '2023-01'];

    console.log()
    let data = {
        labels,
        datasets: [
            {
                label: 'Type 1',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 1')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#B4EEB4',
                stack: 'Stack 0',
            },
            {
                label: 'Type 2',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 2')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#008080',
                stack: 'Stack 0',
            },
            {
                label: 'Type 3',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 3')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#DAA520',
                stack: 'Stack 0',
            },
            {
                label: 'Type 4',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 4')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#DD0808',
                stack: 'Stack 0',
            },
            {
                label: 'Type 5',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 5')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#FAEBD7',
                stack: 'Stack 0',
            },
            {
                label: 'Type 6',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 6')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#66CDAA',
                stack: 'Stack 0',
            },
            {
                label: 'Type 7',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm =>
                            bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === 'Type 7')).length
                        return countType
                    } else return 0
                }),
                backgroundColor: '#9E5148',
                stack: 'Stack 0',
            },
            {
                label: 'Mixed',
                data: labels.map(label => {
                    let bms = bmByMonth[label]
                    if (bms) {
                        let countType = bms.filter(bm => bm.stoolTypes.length > 1)
                        return countType
                    } else return 0
                }),
                backgroundColor: '#000000',
                stack: 'Stack 0',
            }
        ],
    };

    // console.log(bmByDayCountSorted)
    // console.log(highestBmCountDate)
    //console.log(Object.keys(bmByDayCount).find(day => bmByDayCount[day] === highestbmByDayCount))

    // console.log(Object.keys(bmByDayCount).filter(count => bmByDayCount[count] === highestbmByDayCount))

    // console.log(bmByMonthCount)

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
            <div>
                <Bar options={options} data={data} height={300} />
            </div>
        </div>
    )
}

export default Analysis;