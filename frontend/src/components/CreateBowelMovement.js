import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dataService from '../services/dataService';
import Checkbox from './Checkbox';
import Modal from 'react-modal';

const CreateBowelMovement = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const preSelectedDate = location.state?.date

    const [date, setDate] = useState(new Date().toLocaleString('sv').split(' ')[0]);
    const [time, setTime] = useState(new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }).split(" ")[0]);
    const [dateTimeWarning, setDateTimeWarning] = useState('');
    const [stoolTypes, setStoolTypes] = useState([])
    const [colors, setColors] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    
    /* Modals */
    //Sets whether each details modal is open
    Modal.setAppElement(document.getElementById('root'));
    const [stoolTypeModalIsOpen, setStoolTypeModalIsOpen] = useState(false);
    const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
    const [symptomModalIsOpen, setSymptomModalIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    /* Check Boxes */
    //Sets the value of the checkboxes (ids) to be sent as in array based on the name of the checkbox. 
    //Selections will be added to the array using handleSelection.
    const checkboxValues = {
        colorsSelected: [],
        stoolTypesSelected: [],
        symptomsSelected: []
    }

    const [checkboxes, setCheckboxes] = useState(checkboxValues);

    const handleSelection = event => {
        const { name, value } = event.target;

        //If checkbox is checked, add the id to the array
        if (event.target.checked) {
            setCheckboxes({ ...checkboxes, [name]: [...checkboxes[name], value] });
        }

        //If checkbox is unchecked, remove that value from the array
        if (!event.target.checked) {
            setCheckboxes({
                ...checkboxes, [name]: checkboxes[name].filter((selected) => {
                    return selected !== value
                })
            })
        }
    }

    /* Get Data */
    useEffect(() => {
        dataService.getColors(colors => {
            setColors(colors);
        })

        dataService.getStoolTypes(stoolTypes => {
            setStoolTypes(stoolTypes);
        })

        dataService.getSymptoms(symptoms => {
            setSymptoms(symptoms);
        })
    }, [])

    /* Handle Submit */
    const handleSubmit = event => {
        event.preventDefault();

        //Reset validaition errors
        setErrors({});
        setDateTimeWarning();

        //If time selected is later than current time, do not allow submission
        if (new Date(`${date} ${time}`) > new Date()) {
            setDateTimeWarning('Cannot select future occurence.');
        } else {
            dataService.createBowelMovement({
                date: date,
                time: time,
                notes: notes,
                stooltypes: checkboxes.stoolTypesSelected, //array of ids
                colors: checkboxes.colorsSelected, //array of ids
                symptoms: checkboxes.symptomsSelected, //array of ids
            }, error => {
                if (!error) {
                    navigate('/');
                } else {
                    setErrors(error.data);
                }
            })
        }
    }

    return (
        <div className='form__wrapper'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form__title'>New Entry</h1>
                <div className='form__row'>
                    <div className='form__row--split'>
                        <div className='form__half-row'>
                            <label htmlFor="datePicker">
                                Date
                            </label>
                            <div>
                                <input type='date' id='datePicker' name='date'
                                    max={new Date().toLocaleString('sv').split(' ')[0]}
                                    value={ preSelectedDate? preSelectedDate: date}
                                    onChange={e => setDate(e.target.value)}
                                    className='form__text-input' />
                            </div>
                        </div>

                        <div className='form__half-row'>
                            <label htmlFor='timePicker'>
                                Time
                            </label>
                            <div>
                                <input type='time' id='timePicker' name='time'
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    step='60'
                                    className='form__text-input' />
                            </div>
                        </div>
                    </div>
                    <div className='form__error'>
                        {
                            errors.date && <span className='error'>{errors.date.message}</span>
                        }
                        {
                            errors.time && <span className='error'>{errors.time.message}</span>
                        }
                        {
                            dateTimeWarning && <span className='error'>{dateTimeWarning}</span>
                        }
                    </div>
                </div>

                <div className='form__row'>
                    <Modal
                        key='stoolTypeModal'
                        isOpen={stoolTypeModalIsOpen}
                        onRequestClose={() => setStoolTypeModalIsOpen(false)}
                        style={customStyles}
                        contentLabel='Bristol Stool Chart Details'
                    >
                        <div className='modal__header'>
                            <h2 className='modal__title'>Bistol Stool Scale</h2>
                            <button onClick={() => setStoolTypeModalIsOpen(false)} aria-label='Close' title='Close'>X</button>
                        </div>
                        <table className='modal__table modal__table--stooltypes'>
                            <tbody>
                            {stoolTypes.map(stoolType => {
                                return (
                                    <tr key={stoolType.name}>
                                        <td>image</td>
                                        <td>{stoolType.name}</td>
                                        <td>{stoolType.description}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div>Learn More</div>
                    </Modal>

                    <fieldset>
                        <legend>
                            <span className='label'>Bristol Stool Scale</span>
                            <button onClick={() => setStoolTypeModalIsOpen(true)} type='button' aria-label='Open Bristol Stool Scale Details' title='Bristol Stool Scale Details' className='button--info'>?</button>
                        </legend>
                        {
                            stoolTypes.map(stoolType => {
                                return (
                                    <Checkbox
                                        label={stoolType.name}
                                        title={stoolType.name}
                                        key={stoolType.name}
                                        value={stoolType._id}
                                        name='stoolTypesSelected'
                                        className={'checkbox--stooltype'}
                                        onChange={handleSelection}
                                    />
                                )
                            })
                        }
                    </fieldset>
                    <div className='form__error'>
                        {
                            errors.stoolTypes && <span className='error'>{errors.stoolTypes.message}</span>
                        }
                    </div>
                </div>

                <div className='form__row'>
                    <Modal
                        key='colorModal'
                        isOpen={colorModalIsOpen}
                        onRequestClose={() => setColorModalIsOpen(false)}
                        style={customStyles}
                        contentLabel='Color Details'
                    >
                        <div className='modal__header'>
                            <h2 className='modal__title'>Colors</h2>
                            <button onClick={() => setColorModalIsOpen(false)} aria-label='Close' title='Close'>X</button>
                        </div>
                        <table className='modal__table modal__table--colors'>
                            <tbody>
                            {colors.map(color => {
                                return (
                                    <tr key={color.name}>
                                        <td>image</td>
                                        <td>{color.name}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div>Learn More</div>
                    </Modal>

                    <fieldset>
                        <legend>
                            <span className='label'>Color</span>
                            <button onClick={() => setColorModalIsOpen(true)}
                            type='button' aria-label='Open Color Details' title='Color Details' className='button--info'>?</button>
                        </legend>
                        {
                            colors.map(color => {
                                return (
                                    <Checkbox
                                        label={color.name}
                                        title={color.name}
                                        key={color.name}
                                        value={color._id}
                                        name='colorsSelected'
                                        className={'checkbox--color'}
                                        onChange={handleSelection}
                                    />
                                )
                            })
                        }
                    </fieldset>
                    <div className='form__error'>
                        {
                            errors.colors && <span className='error'>{errors.colors.message}</span>
                        }
                    </div>
                </div>

                <div className='form__row'>
                    <Modal
                        key='symptomModal'
                        isOpen={symptomModalIsOpen}
                        onRequestClose={() => setSymptomModalIsOpen(false)}
                        style={customStyles}
                        contentLabel='Symptoms Details'
                    >
                        <div className='modal__header'>
                            <h2 className='modal__title'>Symptoms Information</h2>
                            <button onClick={() => setSymptomModalIsOpen(false)} aria-label="Close" title="Close">X</button>
                        </div>
                        <table className='modal__table modal__table--symptoms'>
                            <tbody>
                                {symptoms.map(symptom => {
                                    return (
                                        <tr key={symptom.name}>
                                            <td>{symptom.name}</td>
                                            <td>{symptom.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div>Learn More</div>
                    </Modal>

                    <fieldset>
                        <legend>
                            <span className='label'>Symptoms</span>
                            <button onClick={() => setSymptomModalIsOpen(true)} type='button' aria-label='Open Symptom Details' title='Symptom Details' className='button--info'>?</button>
                        </legend>
                        {
                            symptoms.map(symptom => {
                                return (
                                    <Checkbox
                                        label={symptom.name}
                                        key={symptom.name}
                                        value={symptom._id}
                                        name='symptomsSelected'
                                        className={'checkbox--symptom'}
                                        onChange={handleSelection}
                                    />
                                )
                            })
                        }
                    </fieldset>
                    <div className='form__error'>
                        {
                            errors.symptoms && <span className='error'>{errors.symptoms.message}</span>
                        }
                    </div>
                </div>

                <div className='form__row'>
                    <label htmlFor='inputNotes'>
                        Notes
                    </label>
                    <div>
                        <textarea
                            id='inputNotes'
                            name='notes'
                            onChange={e => setNotes(e.target.value)}
                            className='form__textarea'
                        />
                    </div>
                    <div className='form__error'>
                        {
                            errors.notes && <span className='error'>{errors.notes.message}</span>
                        }
                    </div>
                </div>

                <div className='form__error form__error--final'>
                    {
                        errors.serverMessage && <span className='error'>{errors.serverMessage}</span>
                    }
                </div>

                <div className='form__button-row'>
                    <button type="submit" className='button button--submit cta'>
                        Save
                    </button>
                </div>

            </form>
        </div>
    )
}
export default CreateBowelMovement;

