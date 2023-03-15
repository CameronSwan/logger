import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Checkbox from './Checkbox';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verification, setVerification] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [agreeTOS, setAgreeTOS] = useState(false);
    const [TOSMessage, setTOSMessage] = useState('');
    const [errors, setErrors] = useState({});

    //use the hook provided by react-router
    const navigate = useNavigate();

    const handleChecked = () => {
        setAgreeTOS(!agreeTOS)
    };

    const handleSubmit = event => {
        event.preventDefault();

        //Reset validaition errors
        setErrors({});
        setTOSMessage('');
        setVerificationMessage('');

        if (verification !== password) {
            setVerificationMessage('Passwords must match.')
        } else if (agreeTOS !== true) {
            setTOSMessage('You must agree to the Terms of Service')
        } else {
            authService.register({ username, email, password }, error => {
                // if (!error) {
                //   navigate('/');
                // }
            })
        }
    }

    return (
        <div className='form__wrapper'>
            <form className='form' onSubmit={handleSubmit}>

                <div className='form__row'>
                    <label htmlFor='inputUsername'>
                        Username
                    </label>
                    <div>
                        <input type='text'
                            id='inputUsername'
                            name='username'
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Enter username'
                            className='form__text-input'
                        />
                        <div className='form__error'>
                            {
                                errors.username && <span className='error'>{errors.username.message}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='form__row'>
                    <label htmlFor='inputEmail'>
                        Email *
                    </label>
                    <div>
                        <input type='email'
                            id='inputEmail'
                            name='email'
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter email address'
                            className='form__text-input'
                        />
                        <div className='form__error'>
                            {
                                errors.email && <span className='error'>{errors.email.message}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='form__row'>
                    <label htmlFor='inputPassword'>
                        Password *
                    </label>
                    <div>
                        <input type='password'
                            id='inputPassword'
                            name='password'
                            onChange={e => setPassword(e.target.value)}
                            className='form__text-input'
                        />
                        <div className='form__error'>
                            {
                                errors.password && <span className='error'>{errors.password.message}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='form__row'>
                    <label htmlFor='verifyPassword'>
                        Verify Password *
                    </label>
                    <div>
                        <input type='password'
                            id='verifyPassword'
                            name='verifypassword'
                            onChange={e => setVerification(e.target.value)}
                            className='form__text-input'
                        />
                        <div className='form__error'>
                            {
                                verificationMessage && <span className='error'>{verificationMessage}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='form__row '>
                    <Checkbox
                        label='I have read and agree to the Terms of Service, Privacy Policy and Community Guidelines.'
                        id='Terms Of Service'
                        value={agreeTOS}
                        onChange={handleChecked}
                        className='form__checkbox-row form__checkbox--classic'
                    />

                    <Checkbox
                        id='Email Subscription'
                        label='I would like to receive emails and updates about Logger.'
                        className='form__checkbox-row form__checkbox--classic'
                    />
                </div>

                <div className='form__error form__error--final'>
                    {
                        errors.serverMessage && <span className='error'>{errors.serverMessage}</span>
                    }
                    {
                        TOSMessage && <span className='error'>{TOSMessage}</span>
                    }
                </div>

                <div className='form__button-row'>
                    <button type='submit' className='button button--submit cta'>Sign Up</button>
                </div>

            </form>
            <div>
                Already have an account? <Link to='/login' relative='path'>Log in</Link>
            </div>

        </div>
    )
}
export default Register;

