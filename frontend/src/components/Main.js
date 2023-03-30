import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../services/dataService';
import history from '../img/icons/history.svg';
import analysis from '../img/icons/analysis.svg';
import community from '../img/icons/community.svg';
import info from '../img/icons/info.svg';

const Main = () => {
    const [funFacts, setFunFacts] = useState([]);
    const [randomFact, setRandomFact] = useState('');

    const getRandomFact = () => {
        let num = Math.floor(Math.random() * (funFacts.length))
        setRandomFact(funFacts[num])
    }

    /* Get Data */
    useEffect(() => {
        dataService.getFacts(facts => {
            setFunFacts(facts);
            setRandomFact(facts[Math.floor(Math.random() * (facts.length))])
        })

    }, []);

    return (
        <div className='main outside-spacing'>
            <h1 className='underlined bottom-spacing'>Hello</h1>
            <div>
                <div className='form__button-row'>
                    <Link to='/bowelmovement/create' rel='path' className='button button--submit button--new-entry cta'>New Entry</Link>
                </div>
            </div>

            <h2 className='underlined bottom-spacing'>Explore</h2>
            <div className='main__explore-tabs bottom-spacing'>
                <Link to='/bowelmovement/history' className='tab h2 link'>
                    <img src={history} className='tab__icon' alt='History Icon' />
                    History
                </Link>
                <Link to='/bowelmovement/analysis' className='tab h2 link'>
                    <img src={analysis} className='tab__icon' alt='Analysis Icon' />
                    Analysis
                </Link>
                <Link to='/community' className='tab h2 link'>
                    <img src={community} className='tab__icon' alt='Community Icon' />
                    Community
                </Link>
                <Link to='/info' className='tab h2 link'>
                    <img src={info} className='tab__icon' alt='' />
                    Info
                </Link>
            </div>

            {randomFact &&
                <div className='fun-fact'>
                    <button onClick={getRandomFact} className='fun-fact__refresh button--link'>↻</button>
                    <div className='fun-fact__content'>
                            <div className='fun-fact__title h2'>FunFact:</div>
                        <div className='fun-fact__fact'>{randomFact.description}</div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Main;