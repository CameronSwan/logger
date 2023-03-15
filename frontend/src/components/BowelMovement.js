import React, { useEffect, useState } from 'react';
import dataService from '../services/dataService';
import { Link } from "react-router-dom";

export const BowelMovement = (props) => {
    const [stoolType, setStoolType] = useState('');

    return (
        <div>
            <h4>{props.bm._id}</h4>
            {props.bm.date}
            {props.bm.time}
            {props.bm.stoolTypes}

            <div><Link to={`/bowelmovement/edit/${props.bm._id}`} relative="path" className="btn btn-sm btn-outline-secondary">edit</Link>
            </div>

        </div>
    )
}