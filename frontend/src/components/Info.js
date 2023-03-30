import React from 'react';
import { Link } from 'react-router-dom';
import information from '../img/icons/information.svg';
import privacy from '../img/icons/privacy.svg';
import terms from '../img/icons/terms.svg';
import community from '../img/icons/community.svg';

const Info = () => {

    return (
        <div className='info outside-spacing'>
            <h1 className='underlined bottom-spacing'>Information</h1>

            <div className='info__links'>
                <Link to='/about' className='tab tab--small h2 link'>
                    <img src={information} className='tab__icon' alt='' />
                    About
                </Link>

                <Link to='/privacypolicy' className='tab tab--small h2 link'>
                    <img src={privacy} className='tab__icon' alt='' />
                    Privacy Policy
                </Link>

                <Link to='/termsofservice' className='tab tab--small h2 link'>
                    <img src={terms} className='tab__icon' alt='' />
                    Terms of Service
                </Link>

                <Link to='/communityguidelines' className='tab tab--small h2 link'>
                    <img src={community} className='tab__icon' alt='' />
                    Community Guidelines
                </Link>
            </div>
        </div>
    )
}

export default Info;