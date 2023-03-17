import React from 'react';
import { Link } from "react-router-dom";

const Main = () => {

    return (
        <div className='main outside-spacing'>
            <h1 className='underlined bottom-spacing'>Hello</h1>
            <div>
            <p>Coming soon!</p>
            <div className='main__button-row'>
                <Link to='/bowelmovement/create' rel='path' className='button button--link button--submit button__new-entry cta'>New Entry</Link>
            </div>
            </div>
           
            <h2 className='underlined bottom-spacing'>Explore</h2>
            <div className='main__explore-tabs'>
                <Link to='/bowelmovement/history' className='tab h2 link'>History</Link>
                <Link to='/bowelmovement/analysis' className='tab h2 link'>Analysis</Link>
                <Link to='/community' className='tab h2 link'>Community</Link>
                <Link to='/info' className='tab h2 link'>Info</Link>
            </div>
        </div>

    )
}

export default Main;