import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import dataService from '../services/dataService'
import Checkbox from './Checkbox';
import BristolStoolScale from './BristolStoolScale';

const CreateBowelMovement = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }).split(" ")[0]);
  const [dateTimeWarning, setDateTimeWarning] = useState('');
  const [stoolTypes, setStoolTypes] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [colors, setColors] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  //Sets the value of the checkboxes to be sent as an array based on the name of the checkbox. Selections will be added to the array using handleSelection.
  const checkboxValues = {
    colorsSelected: [],
    stoolTypesSelected: [],
    symptomsSelected: []
  }
  const [checkboxes, setCheckboxes] = useState(checkboxValues)

  useEffect(() => {
    dataService.getColors(colors => {
      setColors(colors)
    })

    dataService.getStoolTypes(stoolTypes => {
      setStoolTypes(stoolTypes)
    })

    dataService.getSymptoms(symptoms => {
      setSymptoms(symptoms)
    })
  }, [])

  const handleSelection = event => {
    const { name, value } = event.target;

    //If checkbox is checked, add the id to the array
    if (event.target.checked) {
      setCheckboxes({ ...checkboxes, [name]: [...checkboxes[name], value] })
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


  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    //Reset validaition errors
    setErrors({});
    setDateTimeWarning();

    if (`${date} ${time}` > new Date().toISOString().split("T").join(' ')) {
      setDateTimeWarning("That hasn't happened yet...")
    }

    console.log(date)
    console.log(time)
    console.log(checkboxes.stoolTypesSelected)
    console.log(checkboxes.colorsSelected)
    console.log(checkboxes.symptomsSelected)
    console.log(notes)

    dataService.createBowelMovement({
      date: date,
      time: time,
      notes: notes,
      stoolTypes: checkboxes.stoolTypesSelected, //array of ids
      colors: checkboxes.colorsSelected, //array of ids
      symptoms: checkboxes.symptomsSelected, //array of ids
    }, error => {
      if (!error) {
        navigate('/')
      } else {
        setErrors(error.data)
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Entry</h1>

        <div>
          <div>
            <label htmlFor="date">
              Date
            </label>
            <input type="date" id="datePicker" name="date"
              max={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={e => setDate(e.target.value)} />
          </div>

          <div>
            <label htmlFor="time">
              Time
            </label>
            <input type="time" id="timePicker" name="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              step="60" />
            <div>
              {
                dateTimeWarning && <span>{dateTimeWarning}</span>
              }
            </div>
          </div>
        </div>

        <div>
          <fieldset>
            <legend>
              Bristol Stool Scale
              <button type="button" title='Bristol Stool Scale Information' onClick={() => setShowModal(true)}>i</button>
            </legend>
            <BristolStoolScale onClose={() => setShowModal(false)} showModal={showModal} />
            {
              stoolTypes.map(stoolType => {
                return (
                  <Checkbox
                    label={stoolType.name}
                    key={stoolType.name}
                    value={stoolType._id}
                    name="stoolTypesSelected"
                    className={"checkbox-stooltypes"}
                    onChange={handleSelection}
                  />
                )
              })
            }
          </fieldset>
          <div>
            {
              errors.stoolTypes && <span>{errors.stoolTypes.message}</span>
            }
          </div>
        </div>

        <div>
          <fieldset>
            <legend>Color</legend>
            {
              colors.map(color => {
                return (
                  <Checkbox
                    label={color.name}
                    key={color.name}
                    value={color._id}
                    name="colorsSelected"
                    className={"checkbox-colors"}
                    onChange={handleSelection}
                  />
                )
              })
            }
          </fieldset>
          <div>
            {
              errors.colors && <span>{errors.colors.message}</span>
            }
          </div>
        </div>

        <div>
          <fieldset>
            <legend>Symptoms</legend>
            {
              symptoms.map(symptom => {
                return (
                  <Checkbox
                    label={symptom.name}
                    key={symptom.name}
                    value={symptom._id}
                    name="symptomsSelected"
                    className={"checkbox-symptoms"}
                    onChange={handleSelection}
                  />
                )
              })
            }
          </fieldset>
          <div>
            {
              errors.symptoms && <span>{errors.symptoms.message}</span>
            }
          </div>
        </div>

        <div>
          <label htmlFor="inputNotes">
            Notes
          </label>
          <div>
            <input type="text"
              id="inputNotes"
              name="notes"
              onChange={e => setNotes(e.target.value)}
            />
            <div>
              {
                errors.notes && <span>{errors.notes.message}</span>
              }
            </div>
          </div>
        </div>

        <div>
          {
            errors.serverMessage && <span>{errors.serverMessage}</span>
          }
        </div>

        <button type="submit">
          Save
        </button>

      </form>
    </div>
  )
}
export default CreateBowelMovement;

