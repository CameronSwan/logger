import React from 'react';
import { Link } from 'react-router-dom';
import history from '../img/icons/history.svg';
import analysis from '../img/icons/analysis.svg';
import community from '../img/icons/community.svg';
import info from '../img/icons/info.svg';

const Main = () => {

    return (
        <div className='main outside-spacing'>
            <h1 className='underlined bottom-spacing'>Hello</h1>
            <div>
                <p>Coming soon!</p>
                <div className='form__button-row'>
                    <Link to='/bowelmovement/create' rel='path' className='button button--submit button--new-entry cta'>New Entry</Link>
                </div>
            </div>

            <h2 className='underlined bottom-spacing'>Explore</h2>
            <div className='main__explore-tabs'>
                <Link to='/bowelmovement/history' className='tab h2 link'>
                    <img src={history} className='tab__icon' alt=''/>
                    History
                </Link>
                <Link to='/bowelmovement/analysis' className='tab h2 link'>
                <img src={analysis} className='tab__icon' alt=''/>
                    Analysis
                </Link>
                <Link to='/community' className='tab h2 link'>
                <img src={community} className='tab__icon' alt=''/>
                    Community
                </Link>
                <Link to='/info' className='tab h2 link'>
                <img src={info} className='tab__icon' alt=''/>
                    Info
                </Link>
            </div>
        </div>

    )
}

export default Main;