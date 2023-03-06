import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import DatePicker from 'react-date-picker'
// import TimePicker from 'react-time-picker';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import authService from '../services/authService';
import dataService from '../services/dataService'
import Checkbox from './Checkbox';

const CreateBowelMovement = (props) => {

  const [time, setTime] = useState(new Date().toTimeString().split(' ')[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dateTimeWarning, setDateTimeWarning] = useState('');

  const [stoolTypes, setStoolTypes] = useState([]);
  const [stoolTypesSelected, setStoolTypesSelected] = useState([]);

  const [colors, setColors] = useState([]);
  const [colorsSelected, setColorsSelected] = useState([]);

  const [notes, setNotes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dataService.getColors(colors => {
      setColors(colors)
    })

    dataService.getStoolTypes(stoolTypes => {
      setStoolTypes(stoolTypes)
    })
  }, [])

  //use the hook provided by react-router
  const navigate = useNavigate();

  //Add the stool types to an array if checked. If un-checked, remove them from the array
  const handleStoolTypeSelection = event => {
    if (event.target.checked) {
      setStoolTypesSelected([...stoolTypesSelected, event.target.value])
    }
    if (!event.target.checked) {
      setStoolTypesSelected(stoolTypesSelected.filter((types) => {
        return types !== event.target.value
      }))
    }
  }

  const handleColorSelection = event => {
    if (event.target.checked) {
      setColorsSelected([...colorsSelected, event.target.value])
    }
    if (!event.target.checked) {
      setColorsSelected(colorsSelected.filter((types) => {
        return types !== event.target.value
      }))
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    //Reset validaition errors
    setErrors({});
    setDateTimeWarning();

    if (`${date} ${time}` > new Date().toISOString().split("T").join(' ')) {
      setDateTimeWarning("That hasn't happened yet...")
    }

    console.log(stoolTypesSelected)
    console.log(colorsSelected)
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
              onChange={e => setTime(e.target.value)} />
            <div>
              {
                dateTimeWarning && <span>{dateTimeWarning}</span>
              }
            </div>
          </div>
        </div>

        <div>
          <fieldset>
            <legend>Bristol Stool Scale</legend>
            {
              stoolTypes.map(stoolType => {
                return (
                  <Checkbox
                    label={stoolType.name}
                    key={stoolType.name}
                    value={stoolType._id}
                    className={"checkbox-stooltypes"}
                    onChange={handleStoolTypeSelection}
                  />
                )
              })
            }
          </fieldset>
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
                    className={"checkbox-colors"}
                    onChange={handleColorSelection}
                  />
                )
              })
            }
          </fieldset>
        </div>

        <div>
          {/*symptoms */}
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

