import React, { useEffect, useState } from 'react';
import dataService from '../services/dataService';
import { Link } from "react-router-dom";

export const BowelMovement = (props) => {
    const displayTime = new Date(`${props.bm.date} ${props.bm.time}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let svg = props.bm.stoolTypes.map(stoolType => stoolType.svg)

    let colorArray = []
    props.bm.colors.map(color => {
        return colorArray.push(color.name)
    })

    let symptomsArray = []
    props.bm.symptoms.map(symptom => {
        return symptomsArray.push(symptom.name)
    })

    let stoolTypesArray = []
    props.bm.stoolTypes.map(stoolType => {
        return stoolTypesArray.push(stoolType.name)
    })


    return (
        <div className='bm-tab__wrapper'>
            <div className='bm-tab__time h4'>
                {displayTime}
            </div>
            <div className='bm-tab'>
                <div className='bm-tab__content'>
                    <div className='bm-tab__image' dangerouslySetInnerHTML={{ __html: svg[0] }}></div>
                    <div className='bm-tab__data'>
                        <div className='bm-tab__stoolTypes small'>{stoolTypesArray.join(', ')}</div>
                        <div className='bm-tab__colors small'>{colorArray.join(', ')}</div>
                        <div className='bm-tab__symptoms small'>{symptomsArray.length}{symptomsArray.length === 1 ? ' Symptom' : ' Symptoms'}</div>
                    </div>
                    <div className='bm-tab__button-row'>
                        <Link to={`/bowelmovement/edit/${props.bm._id}`} relative="path" title='Edit' className='button--link button--edit button--submit cta'>✎</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}