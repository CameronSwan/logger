import React from 'react';
import { Link } from 'react-router-dom';
import privacy from '../img/icons/privacy.svg';
import terms from '../img/icons/terms.svg';
import community from '../img/icons/community.svg';

const About = () => {

    return (
        <div className='outside-spacing'>
            <h1 className='underlined bottom-spacing'>About</h1>

            <div className='bottom-spacing'>
                <h2 className='dotted-underlined'>Project Details</h2>
                <p>INFT3000 - Capstone</p>
                <p>Group 1</p>
            </div>


            <div className='bottom-spacing dotted-underlined'>
                <h2 className='dotted-underlined bottom-spacing'>Credits</h2>
                <h3>Imagry</h3>
                <ul>
                    <li>Logger Icon and Bristol Stool Chart poop svgs designed by Matt Lemos Champion.</li>
                </ul>
                <ul>
                    <li>
                        All other icons from www.svgrepo.com under public domain license.
                    </li>
                </ul>

            </div>

            <div className='info__links'>
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

export default About;