import React, { useEffect, useState } from 'react';
import dataService from '../services/dataService';
import { Link } from "react-router-dom";

export const BowelMovement = (props) => {
    const [stoolType, setStoolType] = useState('');

    const displayTime = new Date(`${props.bm.date} ${props.bm.time}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return (
        <div className='bm-tab__wrapper'>
            <div className='bm-tab__time h4'>
                {displayTime}
            </div>
            <div className='bm-tab'>
                {props.bm.stoolTypes}

                <div>
                    <Link to={`/bowelmovement/edit/${props.bm._id}`} relative="path" title='Edit'>edit</Link>
                </div>
            </div>

        </div>
    )
}