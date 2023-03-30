import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import Checkbox from './Checkbox';
import Modal from 'react-modal';


const EditBowelMovement = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
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
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid black',
            overflow: 'hidden',
            padding: '0'
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

    /* Get data */
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

        dataService.getBowelMovementById(params.id, bm => {
            setDate(bm.date)
            setTime(bm.time)
            setCheckboxes({ stoolTypesSelected: bm.stoolTypes.map(st => st._id), colorsSelected: bm.colors.map(c => c._id), symptomsSelected: bm.symptoms.map(s => s._id) })
            setNotes(bm.notes)
        })
    }, [params.id])

    /* Handle Delete */
    const handleShowDeleteWarning = event => {
        setDeleteModalIsOpen(true);
    }

    const handleDeleteBowelMovement = event => {
        dataService.deleteBowelMovement(params.id, error => {
            if (!error) {
                setDeleteModalIsOpen(false);
                navigate('/')
            } else {
                setDeleteModalIsOpen(false);
                setErrors(error.data);
            }
        })
    }

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
            dataService.updateBowelMovement(params.id, {
                date: date,
                time: time,
                notes: notes,
                stoolTypes: checkboxes.stoolTypesSelected, //array of ids
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
                <h1 className='form__title form__row underlined'>Edit Entry</h1>
                <div className='form__row'>
                    <div className='form__row--split'>
                        <div className='form__half-row'>
                            <label htmlFor="datePicker">
                                Date
                            </label>
                            <div>
                                <input type='date' id='datePicker' name='date'
                                    max={new Date().toLocaleString('sv').split(' ')[0]}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className='form__text-input form__datetime' />
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
                                    className='form__text-input form__datetime' />
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

                <div className='form__row--large'>
                    <fieldset>
                        <legend className='form__legend'>
                            <span className='label form__row'>Bristol Stool Scale</span>
                            <button onClick={() => setStoolTypeModalIsOpen(true)} type='button' aria-label='Open Bristol Stool Scale Details' title='Bristol Stool Scale Details' className='button--info button'>?</button>
                        </legend>
                        <div className='form__checkbox-row form__checkbox-row--styled'>
                            {
                                stoolTypes.map(stoolType => {
                                    return (
                                        <Checkbox
                                            label={<div className='form__checkbox--image' dangerouslySetInnerHTML={{ __html: stoolType.svg }}></div>}
                                            title={stoolType.name}
                                            key={stoolType.name}
                                            value={stoolType._id}
                                            id={stoolType.name}
                                            name='stoolTypesSelected'
                                            className={'form__checkbox--styled'}
                                            onChange={handleSelection}
                                            checked={(checkboxes.stoolTypesSelected.includes(stoolType._id))}
                                        />
                                    )
                                })
                            }
                        </div>
                    </fieldset>
                    <div className='form__error'>
                        {
                            errors.stoolTypes && <span className='error form__row'>{errors.stoolTypes.message}</span>
                        }
                    </div>
                </div>

                <div className='form__row--large'>
                    <fieldset>
                        <legend className='form__legend'>
                            <span className='label form__row'>Color</span>
                            <button onClick={() => setColorModalIsOpen(true)}
                                type='button' aria-label='Open Color Details' title='Color Details' className='button--info button'>?</button>
                        </legend>
                        <div className='form__checkbox-row form__checkbox-row--styled'>
                            {
                                colors.map(color => {
                                    return (
                                        <Checkbox
                                            label={<div className='form__checkbox--image'><svg width="31" height="32" viewBox="0 0 31 32" fill={color.hexCode} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.89034 30.3976C9.89034 30.3976 26.139 26.1229 28.175 24.9612C30.2111 23.7995 29.41 22.3739 29.2929 21.9493C28.8537 20.3573 27.7359 19.8561 26.8177 19.8131C25.8994 19.77 4.14146 24.8042 3.82207 24.8042C3.50269 24.8042 0.3887 25.6647 1.10731 27.9881C1.6822 29.8469 3.68899 30.7132 4.46083 30.7418C6.03113 30.6271 9.89034 30.3976 9.89034 30.3976ZM9.89034 30.3976C10.2097 30.0104 27.0971 25.4496 28.734 25.1914C30.3708 24.9332 30.1313 26.7404 29.6123 28.6766C29.3791 29.5465 28.8936 30.2685 28.175 31C22.16 30.5984 9.63484 30.7074 9.89034 30.3976ZM8.01405 2C10.7554 3.13304 17.0127 7.28156 16.2381 8.02374C15.4635 8.76591 8.57297 11.4228 8.01405 11.2507C7.45513 11.0786 6.22361 9.66267 6.37721 8.66914C6.73642 6.3457 7.93412 6.73294 8.85235 6.3457C9.77058 5.95846 9.57096 6.32228 9.57096 5.227C9.57096 4.32344 8.29348 2.40158 8.01405 2ZM7.05581 12.1973C8.81243 11.1033 16.3006 8.02374 17.7552 8.02374C19.4718 8.02374 20.4699 8.84125 20.7893 9.87389C21.1087 10.9065 21.6676 12.4985 20.7893 13.0579C19.911 13.6172 9.33082 17.0163 8.01405 17.0163C6.25744 17.0163 6.01781 14.5638 7.05581 12.1973ZM6.37721 24.2521C5.39245 23.9366 3.98184 23.0645 3.98184 21.6705C3.98184 18.049 6.73661 17.7908 8.01405 17.4466C9.2915 17.1024 22.4261 13.0579 23.3044 13.0579C24.2166 13.0579 25.5801 13.0579 26.0192 15.3383C26.4584 17.6187 26.8177 18.092 25.5801 19.3398C23.9298 21.0036 14.6012 22.0823 12.9644 22.7707C11.6549 23.3215 5.9514 24.4816 6.37721 24.2521Z" stroke="black" />
                                            </svg></div>}
                                            title={color.name}
                                            key={color.name}
                                            value={color._id}
                                            id={color.name}
                                            name='colorsSelected'
                                            className={'form__checkbox--styled'}
                                            onChange={handleSelection}
                                            checked={(checkboxes.colorsSelected.includes(color._id))}
                                        />
                                    )
                                })
                            }
                        </div>
                    </fieldset>
                    <div className='form__error'>
                        {
                            errors.colors && <span className='error form__row'>{errors.colors.message}</span>
                        }
                    </div>
                </div>

                <div className='form__row--large'>
                    <fieldset>
                        <legend className='form__legend'>
                            <span className='label form__row'>Symptoms</span>
                            <button onClick={() => setSymptomModalIsOpen(true)} type='button' aria-label='Open Symptom Details' title='Symptom Details' className='button--info button'>?</button>
                        </legend>
                        <div className='form__checkbox-row--classic-background'>
                            {
                                symptoms.map(symptom => {
                                    return (
                                        <Checkbox
                                            label={symptom.name}
                                            key={symptom.name}
                                            value={symptom._id}
                                            id={symptom.name}
                                            name='symptomsSelected'
                                            className={'form__checkbox-row form__checkbox--classic'}
                                            onChange={handleSelection}
                                            checked={(checkboxes.symptomsSelected.includes(symptom._id))}
                                        />
                                    )
                                })
                            }
                        </div>
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
                            value={notes}
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

                <div className='form__button-row form__button-row--split'>
                    <button type='button' onClick={handleShowDeleteWarning} className='button button--warning button--half-size cta'>
                        Delete
                    </button>
                    <button type='submit' className='button button--submit button--half-size cta'>
                        Save
                    </button>
                </div>
            </form>

            <div className='modals'>
                <Modal key='stoolTypeModal'
                    isOpen={stoolTypeModalIsOpen}
                    onRequestClose={() => setStoolTypeModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Bristol Stool Chart Details'
                    contentClassName='custom-modal'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Bistol Stool Scale</h2>
                            <button className='modal__close-button' type='button'  onClick={() => setStoolTypeModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__table modal__table--stooltypes'>
                            {stoolTypes.map(stoolType => {
                                return (
                                    <div key={stoolType.name} className='modal__table-row'>
                                        <div className='modal__image' dangerouslySetInnerHTML={{ __html: stoolType.svg }}></div>
                                        <div className='modal__subtitle label'>{stoolType.name}</div>
                                        <div className='modal__info small'>{stoolType.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='modal__footer'>
                            <Link to='/info' relative='path' className='modal__link link link--with-arrow'>Learn More</Link>
                        </div>
                    </div>
                </Modal>

                <Modal key='colorModal'
                    isOpen={colorModalIsOpen}
                    onRequestClose={() => setColorModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Color Details'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Colors</h2>
                            <button className='modal__close-button' type='button'  onClick={() => setColorModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__table modal__table--colors'>
                            {colors.map(color => {
                                return (
                                    <div className='modal__table-row' key={color.name}>
                                        <div><div className='modal__image'><svg width="31" height="32" viewBox="0 0 31 32" fill={color.hexCode} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.89034 30.3976C9.89034 30.3976 26.139 26.1229 28.175 24.9612C30.2111 23.7995 29.41 22.3739 29.2929 21.9493C28.8537 20.3573 27.7359 19.8561 26.8177 19.8131C25.8994 19.77 4.14146 24.8042 3.82207 24.8042C3.50269 24.8042 0.3887 25.6647 1.10731 27.9881C1.6822 29.8469 3.68899 30.7132 4.46083 30.7418C6.03113 30.6271 9.89034 30.3976 9.89034 30.3976ZM9.89034 30.3976C10.2097 30.0104 27.0971 25.4496 28.734 25.1914C30.3708 24.9332 30.1313 26.7404 29.6123 28.6766C29.3791 29.5465 28.8936 30.2685 28.175 31C22.16 30.5984 9.63484 30.7074 9.89034 30.3976ZM8.01405 2C10.7554 3.13304 17.0127 7.28156 16.2381 8.02374C15.4635 8.76591 8.57297 11.4228 8.01405 11.2507C7.45513 11.0786 6.22361 9.66267 6.37721 8.66914C6.73642 6.3457 7.93412 6.73294 8.85235 6.3457C9.77058 5.95846 9.57096 6.32228 9.57096 5.227C9.57096 4.32344 8.29348 2.40158 8.01405 2ZM7.05581 12.1973C8.81243 11.1033 16.3006 8.02374 17.7552 8.02374C19.4718 8.02374 20.4699 8.84125 20.7893 9.87389C21.1087 10.9065 21.6676 12.4985 20.7893 13.0579C19.911 13.6172 9.33082 17.0163 8.01405 17.0163C6.25744 17.0163 6.01781 14.5638 7.05581 12.1973ZM6.37721 24.2521C5.39245 23.9366 3.98184 23.0645 3.98184 21.6705C3.98184 18.049 6.73661 17.7908 8.01405 17.4466C9.2915 17.1024 22.4261 13.0579 23.3044 13.0579C24.2166 13.0579 25.5801 13.0579 26.0192 15.3383C26.4584 17.6187 26.8177 18.092 25.5801 19.3398C23.9298 21.0036 14.6012 22.0823 12.9644 22.7707C11.6549 23.3215 5.9514 24.4816 6.37721 24.2521Z" stroke="black" />
                                        </svg></div></div>
                                        <div className='modal__subtitle label'>{color.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='modal__footer'>
                            <Link to='/info' relative='path' className='modal__link link link--with-arrow'>Learn More</Link>
                        </div>
                    </div>
                </Modal>

                <Modal key='symptomModal'
                    isOpen={symptomModalIsOpen}
                    onRequestClose={() => setSymptomModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Symptoms Details'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Symptoms</h2>
                            <button className='modal__close-button' type='button'  onClick={() => setSymptomModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__table modal__table--symptoms'>
                            {symptoms.map(symptom => {
                                return (
                                    <div className='modal__table-row'
                                        key={symptom.name}>
                                        <div className='modal__subtitle label'>{symptom.name}</div>
                                        <div className='modal__info small'>{symptom.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='modal__footer'>
                            <Link to='/info' relative='path' className='modal__link link link--with-arrow'>Learn More</Link>
                        </div>
                    </div>
                </Modal>

                <Modal key='Delete Warning Modal'
                    isOpen={deleteModalIsOpen}
                    onRequestClose={() => setDeleteModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Delete Bowel Movement Warning'
                    contentClassName='custom-modal'
                >
                    <div className='modal__content'>
                        <div className='form__row--large cta'>Are you sure you want to delete this entry? This cannot be undone.</div>
                        <div className='form__button-row form__button-row--split'>
                            <button type='button' className='button button--cancel button--half-size cta' onClick={() => setDeleteModalIsOpen(false)}>
                                Cancel
                            </button>
                            <button type='button' onClick={handleDeleteBowelMovement} className='button button--warning button--half-size cta'>
                                Delete
                            </button>

                        </div>
                    </div>
                </Modal>
            </div>

        </div>
    )
}

export default EditBowelMovement;