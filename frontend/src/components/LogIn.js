import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        setErrors({})

        authService.login({ email, password }, error => {

        })
    }


    return (
        <div className='form__wrapper'>
            <form className='form' onSubmit={handleSubmit}>

                <div className='form__row'>
                    <label htmlFor='inputEmail'>
                        Email
                    </label>
                    <div>
                        <input type='text'
                            id='inputEmail'
                            name='email'
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email address'
                            className='form__text-input'
                        />
                        <div className='form__help'>
                            <Link to="#" relative="path">Forgot login?</Link>
                        </div>
                    </div>
                </div>

                <div className='form__row'>
                    <label htmlFor='inputPassword'>
                        Password
                    </label>
                    <div>
                        <input type='password'
                            id='inputPassword'
                            name='password'
                            onChange={e => setPassword(e.target.value)}
                            className='form__text-input'
                        />
                        <div className='form__help'>
                            <Link to="#" relative="path">Forgot Password?</Link>
                        </div>
                    </div>
                </div>

                <div className='form__error form__error--final'>
                    {
                        errors.serverMessage && <span>{errors.serverMessage}</span>
                    }
                </div>

                <div className='form__button-row'>
                    <button type='submit' className='button button--submit cta'>
                        Log In
                    </button>
                </div>

            </form>

            <div>
                Don't have an account? <Link to='/register' relative='path'>Sign up</Link>
            </div>

        </div>
    );
}

export default LogIn;