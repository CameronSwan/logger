import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, defaults } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dataService from '../services/dataService';
import Checkbox from './Checkbox';
import Modal from 'react-modal';

// Modal Init
Modal.setAppElement(document.getElementById('root'));
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid black',
        overflow: 'hidden',
        padding: '0'
    },
};

// Chart Init
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);
defaults.font.family = 'Poppins';
defaults.font.size = '12'

// Colors used in all charts 
const bmChartColors = {
    'Type 1': '#B4EEB4',
    'Type 2': '#008080',
    'Type 3': '#DAA520',
    'Type 4': '#DD0808',
    'Type 5': '#FAEBD7',
    'Type 6': '#66CDAA',
    'Type 7': '#9E5148',
    'Mixed': '#959F94'
}

//Chart labels
const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const typeLabels = ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Mixed'];

const Analysis = () => {
    const [bowelmovements, setBowelmovements] = useState([]);
    const [bmDates, setBMDates] = useState([]);
    const [hideMixed, setHideMixed] = useState(false);
    const [scaleLabel, setScaleLabel] = useState('# of Bowel Movements');
    const [stoolTypes, setStoolTypes] = useState([])
    const [stoolTypeModalIsOpen, setStoolTypeModalIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const bmCount = bowelmovements.length;

    // Toggle mixed type data
    const handleHideMixed = () => {
        setHideMixed(!hideMixed)
        hideMixed ? setScaleLabel('# of Bowel Movements') : setScaleLabel('# of Types logged')
    }

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

    //Sort bowel movements by weekday
    const bmByWeekday = bowelmovements.reduce((bmsByWeekday, bm) => {
        const weekday = weekLabels[new Date(bm.date).getDay()]
        if (!bmsByWeekday[weekday]) {
            bmsByWeekday[weekday] = [];
        }
        bmsByWeekday[weekday].push(bm)
        return bmsByWeekday
    }, {});

    /* Charts */
    // --------- Types of Bowel Movements Logged -----------
    // Set Chart Options
    let typesByPercentageOptions = {
        responsive: true,
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
                text: 'Types of Bowel Movements Logged',
            },
            datalabels: {
                display: function (context) {
                    return context.dataset.data[context.dataIndex] !== 0;
                },
                color: 'black',
                formatter: (value, ctx) => {
                    //Display values as percentages
                    //https://stackoverflow.com/questions/52044013/chartjs-datalabels-show-percentage-value-in-pie-piece
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        return sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                }
            },
        },
        maintainAspectRatio: false,
    };

    // Count bowel movements by type
    const getTypeCount = (type) => {
        let bms = bowelmovements;
        let countType = 0;
        // If displaying mixed, count all mixed Data
        if (type === 'Mixed' && !hideMixed) {
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
        return countType;
    }

    // Dataset display for Types of Bowel Movements Per Month Chart
    const typesByPercentageDataSet = [
        {
            data: typeLabels.map(type => {
                return getTypeCount(type)
            }),
            backgroundColor: typeLabels.map(type => {
                return bmChartColors[type]
            })
        },
    ]

    // Hide the Mixed dataset when the mixed is hidden.
    const typesByPercentageData = {
        labels: !hideMixed ? typeLabels : typeLabels.filter(label => label !== 'Mixed'),
        datasets: !hideMixed ? typesByPercentageDataSet : typesByPercentageDataSet.filter(data => data.label !== 'Mixed')
    }

    // --------- Types of Bowel Movements per Month -----------

    // Count Bowel Movements per month by Type
    const getTypeCountPerMonth = (month, type) => {
        let monthNum = (monthLabels.indexOf(month)+1)
        month = monthNum < 10 ? `${currentYear}-0${monthNum}`: `${currentYear}-${monthNum}`
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
                },

            },
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

    // Dataset display for Types of Bowel Movements Per Month Chart
    const typesPerMonthDataSet = [
        {
            label: 'Type 1',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 1')
            }),
            backgroundColor: bmChartColors['Type 1'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 2',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 2')
            }),
            backgroundColor: bmChartColors['Type 2'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 3',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 3')
            }),
            backgroundColor: bmChartColors['Type 3'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 4',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 4')
            }),
            backgroundColor: bmChartColors['Type 4'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 5',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 5')
            }),
            backgroundColor: bmChartColors['Type 5'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 6',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 6')
            }),
            backgroundColor: bmChartColors['Type 6'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 7',
            data: monthLabels.map(label => {
                return getTypeCountPerMonth(label, 'Type 7')
            }),
            backgroundColor: bmChartColors['Type 7'],
            stack: 'Stack 0',
        },
        {
            label: 'Mixed',
            data:
                !hideMixed && monthLabels.map(label => {
                    return getTypeCountPerMonth(label, 'Mixed')
                })
            ,
            backgroundColor: bmChartColors['Mixed'],
            stack: 'Stack 0',
        }
    ]

    //Hide the Mixed dataset when the mixed is hidden.
    const typesPerMonthData = {
        labels: monthLabels,
        datasets: !hideMixed ? typesPerMonthDataSet : typesPerMonthDataSet.filter(data => data.label !== 'Mixed'),
    };

    // --------- Types of Bowel Movements per Weekday -----------
    // Count Bowel Movements per weekday by Type
    const getTypeCountPerWeekday = (weekday, type) => {
        let bms = bmByWeekday[weekday]
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

    // Set Chart Options
    let typesPerWeekdayOptions = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
        responsive: true,
        scales: {
            y: {
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
                text: 'Types of Bowel Movements Per Weekday',
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

    // Dataset display for Types of Bowel Movements Per Month Chart
    const typesPerWeekdayDataSet = [
        {
            label: 'Type 1',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 1')
            }),
            backgroundColor: bmChartColors['Type 1'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 2',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 2')
            }),
            backgroundColor: bmChartColors['Type 2'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 3',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 3')
            }),
            backgroundColor: bmChartColors['Type 3'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 4',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 4')
            }),
            backgroundColor: bmChartColors['Type 4'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 5',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 5')
            }),
            backgroundColor: bmChartColors['Type 5'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 6',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 6')
            }),
            backgroundColor: bmChartColors['Type 6'],
            stack: 'Stack 0',
        },
        {
            label: 'Type 7',
            data: weekLabels.map(label => {
                return getTypeCountPerWeekday(label, 'Type 7')
            }),
            backgroundColor: bmChartColors['Type 7'],
            stack: 'Stack 0',
        },
        {
            label: 'Mixed',
            data:
                !hideMixed && weekLabels.map(label => {
                    return getTypeCountPerWeekday(label, 'Mixed')
                })
            ,
            backgroundColor: bmChartColors['Mixed'],
            stack: 'Stack 0',
        }
    ]

    //Hide the Mixed dataset when the mixed is hidden.
    const typesPerWeekdayData = {
        labels: weekLabels,
        datasets: !hideMixed ? typesPerWeekdayDataSet : typesPerWeekdayDataSet.filter(data => data.label !== 'Mixed'),
    };


    //Get Data
    useEffect(() => {
        dataService.getBowelMovements(bowelmovements => {
            setBowelmovements(bowelmovements)
            setBMDates(bowelmovements.map(bm => bm.date))
        })

        dataService.getStoolTypes(stoolTypes => {
            setStoolTypes(stoolTypes);
        })
    }, [])

    return (
        <div className='analysis'>
            <h1 className='underlined outside-spacing  bottom-spacing'>Analysis</h1>

            <div className='analysis__counts outside-spacing bottom-spacing underlined'>
                <div className='analysis__data-split bottom-spacing'>
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
                <div className='bottom-spacing'>
                    <div className='label underlined bottom-spacing'>Insights:</div>
                    <div className='analysis__insight-row'>
                        {highestBmCountDate && <p><span className='strong'>Highest Daily Count:</span> {highestbmByDayCount} - {new Date(highestBmCountDate).toString().substring(0, 15)}</p>}
                    </div>
                </div>
            </div>

            <div className='bottom-spacing underlined'>
                <h2 className='analysis__chart-title bottom-spacing outside-spacing'>Types of Bowel Movements Logged
                    <button onClick={() => setStoolTypeModalIsOpen(true)} type='button' aria-label='Open Bristol Stool Scale Details' title='Bristol Stool Scale Details' className='button--info button'>?</button>
                </h2>

                <div className='analysis__chart analysis__chart--doughnut'>
                    <Doughnut options={typesByPercentageOptions}
                        data={typesByPercentageData} />
                </div>
            </div>

            <div className='bottom-spacing underlined'>
                <h2 className='analysis__chart-title bottom-spacing outside-spacing'>Types of Bowel Movements per Month
                    <button onClick={() => setStoolTypeModalIsOpen(true)} type='button' aria-label='Open Bristol Stool Scale Details' title='Bristol Stool Scale Details' className='button--info button'>?</button>
                </h2>
                <div className='analysis__chart'>
                    <Bar options={typesPerMonthOptions}
                        data={typesPerMonthData}
                        height={500}
                        title='Types of Bowel Movements per Month Chart'
                        key='BmPerMonth' />
                </div>
            </div>

            <div className='bottom-spacing underlined'>
                <h2 className='analysis__chart-title bottom-spacing outside-spacing'>Amount and Type of Bowel Movements per Weekday
                    <button onClick={() => setStoolTypeModalIsOpen(true)} type='button' aria-label='Open Bristol Stool Scale Details' title='Bristol Stool Scale Details' className='button--info button'>?</button>
                </h2>
                <div className='analysis__chart'>
                    <Bar options={typesPerWeekdayOptions}
                        data={typesPerWeekdayData}
                        height={500}
                        key='BmPerWeekday' />
                </div>
            </div>

            <div className='modals'>
                <Modal key='stoolTypeModal'
                    isOpen={stoolTypeModalIsOpen}
                    onRequestClose={() => setStoolTypeModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Bristol Stool Chart Details'
                    contentClassName='custom-modal'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Bistol Stool Scale</h2>
                            <button className='modal__close-button' type='button' onClick={() => setStoolTypeModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__table modal__table--stooltypes'>
                            {stoolTypes.map(stoolType => {
                                return (
                                    <div key={stoolType.name} className='modal__table-row'>
                                        <div className='modal__image' dangerouslySetInnerHTML={{ __html: stoolType.svg }}></div>
                                        <div className='modal__subtitle label'>{stoolType.name}</div>
                                        <div className='modal__info small'>{stoolType.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='modal__footer'>
                            <Link to='/info' relative='path' className='modal__link link link--with-arrow'>Learn More</Link>
                        </div>
                    </div>
                </Modal>
            </div>

            <div className='analysis__toggle-mixed'>
                <Checkbox
                    label='Divide Mixed Bowel Movements into Types'
                    value={hideMixed}
                    onChange={handleHideMixed}
                    className={'form__checkbox--classic form__checkbox--large-label outside-spacing'}
                />
            </div>
        </div>
    )
}

export default Analysis;