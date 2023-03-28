import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, defaults } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dataService from '../services/dataService';
import Checkbox from './Checkbox';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
defaults.font.family = 'Poppins';
defaults.font.size = '10'

const bmChartColors = {
    type1: '#B4EEB4',
    type2: '#008080',
    type3: '#DAA520',
    type4: '#DD0808',
    type5: '#FAEBD7',
    type6: '#66CDAA',
    type7: '#9E5148',
    mixed: '#959F94'
}

const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentYear = new Date().getFullYear();

const Analysis = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [bmDates, setBMDates] = useState([]);
    const [hideMixed, setHideMixed] = useState(false);
    const [scaleLabel, setScaleLabel] = useState('# of Bowel Movements');

    const handleHideMixed = () => {
        setHideMixed(!hideMixed)
        hideMixed ? setScaleLabel('# of Bowel Movements') : setScaleLabel('# of Types logged')
    }
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

    // --------- Types of Bowel Movements per Month-----------
    // Set Chart Options
    let typesPerMonthOptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: scaleLabel //Change label based on data displayed.
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,

                },
                maxHeight: 100
            },
            title: {
                display: false,
                text: 'Types of Bowel Movements Per Month',
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

    // Count Bowel Movements per month by Type
    const getTypeCount = (month, type) => {
        month = new Date(` ${month} ${currentYear}`).toISOString().substring(0, 7)
        let bms = bmByMonth[month]
        let countType = 0
        if (bms) {
            //Count number of Mixed Bowel Movements
            if (type === 'Mixed') {
                countType = bms.filter(bm => bm.stoolTypes.length > 1).length
            } else if (hideMixed) {
                //Count each type, even if the Bowel Movement was Mixed
                countType = bms.filter(bm =>
                    bm.stoolTypes.some(stoolType => stoolType.name === type)).length
            } else {
                //Count each Bowel Movement by Type, if Mixed, display as "Mixed"
                countType = bms.filter(bm =>
                    bm.stoolTypes.length === 1 && bm.stoolTypes.some(stoolType => stoolType.name === type)).length
            }
        }
        return countType;
    }

    // Dataset display for Types of Bowel Movements Per Month Chart
    const typesPerMonthDataSet = [
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
            data:
                !hideMixed && monthLabels.map(label => {
                    return getTypeCount(label, 'Mixed')
                })
            ,
            backgroundColor: bmChartColors.mixed,
            stack: 'Stack 0',
        }
    ]

    //Hide the Mixed dataset when the mixed is hidden.
    const typesPerMonthData = {
        labels: monthLabels,
        datasets: !hideMixed ? typesPerMonthDataSet : typesPerMonthDataSet.filter(data => data.label !== 'Mixed'),
    };


    //Get Data
    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })
    }, [])


    return (
        <div className='outside-spacing analysis'>
            <h1 className='underlined bottom-spacing'>Analysis</h1>
            <div className='analysis__counts bottom-spacing underlined'>

                <div className='analysis__data-split'>

                    <div className='bm-tab'>
                        <div className='bm-tab__content'>
                            <div className='bm-tab__number-data h2'>
                                {bmCount}
                            </div>
                            <div></div>
                            <div className='bm-tab__data-label p'>Entries Recorded</div>
                        </div>
                    </div>

                    <div className='bm-tab'>
                        <div className='bm-tab__content'>
                            <div className='bm-tab__number-data h2'>
                                {bmDaysCount}
                            </div>
                            <div className='bm-tab__data-label p'>Days Recorded</div>
                        </div>
                    </div>
                </div>




            </div>
            <div className='analysis__type-bm-per-month'>
                <h2 className='analysis__chart-title bottom-spacing outside-spacing'>Types of Bowel Movements per Month</h2>

                <Bar options={typesPerMonthOptions}
                    data={typesPerMonthData}
                    height={500}
                    title='Types of Bowel Movements per Month Chart'
                    key='BmPerMonth' />

                <div className='form__row'>
                    <Checkbox
                        label='Show Type value of Mixed Bowel Movements'
                        value={hideMixed}
                        onChange={handleHideMixed}
                        className={'form__checkbox-row form__checkbox--classic'}
                    />
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Analysis;