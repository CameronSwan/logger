import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    defaults
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dataService from '../services/dataService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
defaults.font.family = 'Poppins';

// Set Chrt Options
let typesPerMonthOptions = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 0,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true
            },
            maxHeight: 100
        },
        title: {
            display: false,
            text: 'Types of Bowel Movements per Month',
        },
        datalabels: {
            display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0;
            },
            color: 'black',
            formatter: Math.round,
        },
    },
    maintainAspectRatio: false,
};

let bmChartColors = {
    type1 : '#B4EEB4',
    type2 : '#008080',
    type3 : '#DAA520',
    type4 : '#DD0808',
    type5 : '#FAEBD7',
    type6 : '#66CDAA',
    type7 : '#9E5148',
    mixed : '#959F94'
}

const Analysis = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [bmDates, setBMDates] = useState([]);
    const bmCount = bowelmovements.length

    // Count # of Bowel Movements recorded for each date
    const bmByDayCount = bmDates.reduce((bmsByDay, bmDate) => {
        if (!bmsByDay[bmDate]) {
            bmsByDay[bmDate] = 0;
        }
        bmsByDay[bmDate]++
        return bmsByDay
    }, {});

    // Count number of days with recorded data
    const bmDaysCount = Object.keys(bmByDayCount).length;

    // Sort by highest amount
    const bmByDayCountSorted = Object.entries(bmByDayCount).sort(([, a], [, b]) => a - b).reverse()
    const highestBmCountDate = Object.keys(bmByDayCount).reduce((a, b) => bmByDayCount[a] > bmByDayCount[b] ? a : b, {});
    const highestbmByDayCount = bmByDayCount[highestBmCountDate]

    // Sort bowel movements by month 
    const bmByMonth = bowelmovements.reduce((bmsByYearMonth, bm) => {
        const yearMonth = bm.date.substring(0, 7); // e.g. 2023-03
        if (!bmsByYearMonth[yearMonth]) {
            bmsByYearMonth[yearMonth] = [];
        }
        bmsByYearMonth[yearMonth].push(bm)
        return bmsByYearMonth
    }, {});

    /* Charts */
    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getTypeCount = (month, type) => {
        month = new Date(` ${month} 2023`).toISOString().substring(0, 7)
        let bms = bmByMonth[month]
        let countType = 0

        if (bms) {
            if (type === 'Mixed') {
                countType = bms.filter(bm => bm.stoolTypes.length > 1).length
            } else {
                countType = bms.filter(bm =>
                    bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === type)).length
            }
        }
        return countType;
    }

    let typesPerMonthData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Type 1',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 1')
                }),
                backgroundColor: bmChartColors.type1,
                stack: 'Stack 0',
            },
            {
                label: 'Type 2',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 2')
                }),
                backgroundColor: bmChartColors.type2,
                stack: 'Stack 0',
            },
            {
                label: 'Type 3',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 3')
                }),
                backgroundColor: bmChartColors.type3,
                stack: 'Stack 0',
            },
            {
                label: 'Type 4',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 4')
                }),
                backgroundColor: bmChartColors.type4,
                stack: 'Stack 0',
            },
            {
                label: 'Type 5',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 5')
                }),
                backgroundColor: bmChartColors.type5,
                stack: 'Stack 0',
            },
            {
                label: 'Type 6',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 6')
                }),
                backgroundColor: bmChartColors.type6,
                stack: 'Stack 0',
            },
            {
                label: 'Type 7',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Type 7')
                }),
                backgroundColor: bmChartColors.type7,
                stack: 'Stack 0',
            },
            {
                label: 'Mixed',
                data: monthLabels.map(label => {
                    return getTypeCount(label, 'Mixed')
                }),
                backgroundColor: bmChartColors.mixed,
                stack: 'Stack 0',
            }
        ],
    };

    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })
    }, [])


    return (
        <div className='outside-spacing analysis'>
            <h1 className='underlined bottom-spacing'>Analysis</h1>
            <div className='analysis__counts bottom-spacing'>
                <div>
                    <div><span className='label'>Entries Recorded: </span> {bmCount}</div>
                    
                </div>

                <div>
                    <div><span className='label'>Days Recorded</span>: {bmDaysCount}</div>   
                </div>

            </div>
            <div className='analysis__type-bm-per-month'>
                <h2 className='analysis__chart-title bottom-spacing outside-spacing'>Types of Bowel Movements per Month</h2>
                <Bar options={typesPerMonthOptions} 
                    data={typesPerMonthData} 
                    height={500}
                    title='Types of Bowel Movements per Month Chart'/>
            </div>
        </div>
    )
}

export default Analysis;