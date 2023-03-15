import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import { Link } from "react-router-dom";

const EditBowelMovement = (props) => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [stoolTypes, setStoolTypes] = useState([])
    const [colors, setColors] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});


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
    }, [])

    return (
        <div>
            <div>{date}</div>
            <div>{time}</div>
            <div>{stoolTypes}</div>
            <div>{colors}</div>
            <div>{symptoms}</div>
            <div>{notes}</div>
        </div>
    )
}

export default EditBowelMovement;