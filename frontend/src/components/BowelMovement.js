import React, { useEffect, useState } from 'react'; 
import dataService from '../services/dataService';

export const BowelMovement = (props) => {
    const [stoolType, setStoolType] = useState('');

    return (
        <div>
            <h4>{props.bm._id}</h4>
            {props.bm.date}
            {props.bm.time}
            {props.bm.stoolTypes}
        </div>
    )
}