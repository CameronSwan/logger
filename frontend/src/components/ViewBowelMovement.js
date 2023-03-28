import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';

const ViewBowelMovement = () => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [stoolTypes, setStoolTypes] = useState([])
    const [colors, setColors] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [notes, setNotes] = useState('');

    const params = useParams();

    useEffect(()=> {
        dataService.getBowelMovementById(params.id, bm => {
            setDate(bm.date)
            setTime(bm.time)
            setStoolTypes(bm.stoolTypes)
            setColors(bm.colors)
            setSymptoms(bm.symptoms)
            setNotes(bm.notes)
        })
    }, [params.id])

    return (
        <div>
            <h1>Bowel Movement</h1>
            <div>Date: {date}</div>
            <div>Time: {time}</div>
            <div>Stool Types: {stoolTypes.map(st => st.name)}</div>
            <div>Colors: {colors.map(c => c.name)}</div>
            <div>Symptoms: {symptoms.map(s => s.name)}</div>
            <div>Notes: {notes}</div>
        </div>
    )
}

export default ViewBowelMovement;