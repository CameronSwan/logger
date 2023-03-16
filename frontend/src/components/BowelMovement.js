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

    // Unescape Sanitized Notes:
    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    let notesDisplay = htmlDecode(props.bm.notes);

    return (
        <div className='bm-tab__wrapper'>
            <div className='bm-tab__time h4'>
                {displayTime}
            </div>
            <div className='bm-tab'>
                <div className='bm-tab__content'>
                    <div className='bm-tab__image' dangerouslySetInnerHTML={{ __html: svg[0] }}></div>
                    <div className='bm-tab__data-wrapper'>
                        <div className='bm-tab__data small p'><span className='strong'>Stool Type: </span>{stoolTypesArray.length === 1 ? stoolTypesArray[0] : 'Mix'}</div>
                        <div className='bm-tab__data small p'><span className='strong'>Colors: </span>{colorArray.join(', ')}</div>
                        <div className='bm-tab__data small p'><span className='strong'>Symptoms: </span>{ symptomsArray.length > 0 ? symptomsArray.join(', ') : '0'}</div>
                        <div className='bm-tab__data small p'>
                            {props.bm.notes && <span><span className='strong'>Notes:</span><span> {notesDisplay}</span></span>
                            }
                        </div>
                    </div>
                    <div className='bm-tab__button-row'>
                        <Link to={`/bowelmovement/edit/${props.bm._id}`} relative="path" title='Edit' className='button--link button--edit button--submit cta'>✎</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}