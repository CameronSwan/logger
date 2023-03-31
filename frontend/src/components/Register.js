import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Checkbox from './Checkbox';
import Modal from 'react-modal';
import TOS from './TermsOfService';
import PP from './PrivacyPolicy';
import CG from './CommunityGuidelines';

const Register = () => {

    //Terms and Conditions Modals
    const [TOSModalIsOpen, setTOSModalIsOpen] = useState(false);
    const [PPModalIsOpen, setPPModalIsOpen] = useState(false);
    const [CGModalIsOpen, setCGModalIsOpen] = useState(false);


    Modal.setAppElement(document.getElementById('root'));

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
                if (!error) {
                    navigate('/login');
                } else {
                    //save our validation errors in state
                    setErrors(error.data)
                }
            })
        }
    }

    return (
        <div className='form__wrapper'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='underlined form__row'>Registration</h1>
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
                            autoComplete='username'
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
                            autoComplete='email'
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
                            placeholder='Enter Password'
                            autoComplete='new-password'
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
                            placeholder='Enter Password'
                            autoComplete='new-password'
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
                        className='form__checkbox-row form__checkbox--classic form__checkbox--hidden-label'
                        customLabel={<div className='form__checkbox-custom-label'>I have read and agree to the <button className='button--link link' type='button' onClick={() => setTOSModalIsOpen(true)} aria-label='Open Terms of Service' title='Terms of Service'>Terms of Service</button>, <button className='button--link link' type='button' onClick={() => setPPModalIsOpen(true)} aria-label='Open Terms of Service' title='Terms of Service'>Privacy Policy</button> and <button className='button--link link' type='button' onClick={() => setCGModalIsOpen(true)} aria-label='Open Terms of Service' title='Terms of Service'>Community Guidelines</button>.</div>}
                    />
                    
                    <Checkbox
                        id='Email Subscription'
                        label='I would like to receive emails and updates about Logger.'
                        className='form__checkbox-row form__checkbox--classic form__checkbox--large-label'
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

            <div className='modals'>
                <Modal key='TOSModal'
                    isOpen={TOSModalIsOpen}
                    onRequestClose={() => setTOSModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Terms of Service'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Terms of Service</h2>
                            <button className='modal__close-button' type='button' onClick={() => setTOSModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__large-content'>
                            <TOS />
                        </div>
                    </div>
                </Modal>

                <Modal key='PPModal'
                    isOpen={PPModalIsOpen}
                    onRequestClose={() => setPPModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Privacy Policy'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Privacy Policy</h2>
                            <button className='modal__close-button' type='button' onClick={() => setPPModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__large-content'>
                            <PP />
                        </div>
                    </div>
                </Modal>

                <Modal key='CGModal'
                    isOpen={CGModalIsOpen}
                    onRequestClose={() => setPPModalIsOpen(false)}
                    style={customStyles}
                    contentLabel='Privacy Policy'
                >
                    <div className='modal'>
                        <div className='modal__header'>
                            <h2 className='modal__title'>Community Guidelines</h2>
                            <button className='modal__close-button' type='button' onClick={() => setCGModalIsOpen(false)} aria-label='Close' title='Close'>✖</button>
                        </div>
                        <div className='modal__large-content'>
                            <CG />
                        </div>
                    </div>
                </Modal>
            </div >
        </div >
    )
}
export default Register;

