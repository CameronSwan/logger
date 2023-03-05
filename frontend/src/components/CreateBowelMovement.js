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
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dataService.getColors(colors => {
      setColors(colors)
    })
  }, [])

  //use the hook provided by react-router
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    //Reset validaition errors
    setErrors({});
    setDateTimeWarning();

    if (`${date} ${time}` > new Date().toISOString().split("T").join(' ')) {
      setDateTimeWarning("That hasn't happened yet...")
    }
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
          {/* bristol stool scale */}
        </div>

        <div>
          <label>
            Color
          </label>

          {
            colors.map(color => {
              return (
                <Checkbox
                  label={color.name}
                  key={color.name}
                />
              )
            })
          }
        </div>

        <div>
          {/*symptoms */}
        </div>

        <div>
          {/*notes */}
        </div>

        <button type="submit">
          Save
        </button>

      </form>


    </div>
  )
}
export default CreateBowelMovement;

