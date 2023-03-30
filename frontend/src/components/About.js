import React from 'react';
import { Link } from 'react-router-dom';
import privacy from '../img/icons/privacy.svg';
import terms from '../img/icons/terms.svg';
import community from '../img/icons/community.svg';
import poop from '../img/icons/poop.svg'

const About = () => {

    return (
        <div className='outside-spacing'>
            <h1 className='underlined bottom-spacing'>About</h1>

            <div className='bottom-spacing'>
                <h2 className='dotted-underlined'>Project Details</h2>
                <div className='about__project'>
                    <p>INFT3000 - Capstone</p>
                    <h3>Group 1</h3>
                    <p><span className='strong'>Project Management</span><br />Christina Hemeon</p>
                    <p><span className='strong'>Back-end Development</span><br />Cameron Swan, Maya Pierre, and Brennan Holmes</p>
                    <p><span className='strong'>Front-end Development</span><br />Christina Hemeon and Maya Pierre</p>
                    <p><span className='strong'>Product Design</span><br />Bryan Steiss and Matt Lemos Champion</p>
                </div>
            </div>


            <div className='bottom-spacing dotted-underlined'>
                <h2 className='dotted-underlined bottom-spacing'>Credits</h2>
                <h3>Imagery</h3>
                <ul>
                    <li>
                        Logger logo designed by Bryan Steiss and Matt Lemos Champion
                    </li>
                    <li>
                        Bristol Stool Chart images and poop icons designed by Matt Lemos Champion.
                    </li>
                    <li>
                        All other icons from www.svgrepo.com under public domain license.
                    </li>
                </ul>
                <h3>Fun Facts</h3>
                <ul>
                    <li>https://listverse.com/2021/04/13/10-really-weird-facts-about-poop/</li>
                    <li>https://www.kickassfacts.com/25-weird-facts-about-poop/</li>
                </ul>

                <h3>Bristol Stool Chart</h3>
                <ul>
                    <li>https://onlinelibrary.wiley.com/doi/full/10.1111/apt.13746</li>
                </ul>



                <img src={poop} />
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