import React, { useState } from 'react';

// TODO: Set up email to direct users
const ForgotLogin = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState([]);

    const handleSetMessage = () => {
        email ? setMessage('Check your email for instructions on how to reset your password') : setMessage('Please submit an email address')
    }

    return (
        <div className='outside-spacing'>
            <h1 className='underlined bottom-spacing'>Forgot Credentials?</h1>
            <h2 className='label bottom-spacing'>Submit your email below. If an account exists, we will send you an email to reset your password.</h2>

            <form className='form'>
                <div className='form__row'>
                    <label htmlFor='inputEmail'>
                        Email
                    </label>
                    <input type='text'
                        id='inputEmail'
                        name='email'
                        placeholder='Email address'
                        className='form__text-input'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='form__error form__error--final'>
                    {
                        message && <span className='error'>{message}<br /></span>
                    }
                </div>
                <div className='form__button-row'>
                    <button type='button' className='button button--submit cta' onClick={handleSetMessage}>
                        Submit
                    </button>
                </div>

            </form>


        </div>
    )
}

export default ForgotLogin;