import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = (props) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [errors, setErrors] = useState({});

  //use the hook provided by react-router
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    //Reset validaition errors
    setErrors({});
    setVerificationMessage('');

    if (verification !== password) {
      setVerificationMessage("Passwords must match.")
    } else {
      authService.register({ username, email, password }, error => {
        if (!error) {
          navigate('/');
        } else {
          //save our validation errors in state
          if (error.status === 422) {
            setErrors(error.data.errors)
          } else {
            setErrors(error.data)
          }
        }
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="inputUsername">
            Username *
          </label>
          <div>
            <input type="text"
              id="inputUsername"
              name="username"
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            {
              errors.username && <div>{errors.username.message}</div>
            }
          </div>
        </div>

        <div>
          <label htmlFor="inputEmail">
            Email *
          </label>
          <div>
            <input type="email"
              id="inputEmail"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
            {
              errors.email && <div>{errors.email.message}</div>
            }
          </div>
        </div>

        <div>
          <label htmlFor="inputPassword">
            Password *
          </label>
          <div>
            <input type="password"
              id="inputPassword"
              name="password"
              onChange={e => setPassword(e.target.value)}
            />
            {
              errors.password && <div>{errors.password.message}</div>
            }
          </div>
        </div>

        <div>
          <label htmlFor="inputPassword">
            Verify Password *
          </label>
          <div>
            <input type="password"
              id="inputPassword"
              name="password"
              onChange={e => setVerification(e.target.value)}
            />
            {
              verificationMessage && <div>{verificationMessage}</div>
            }
          </div>
        </div>

        <div>
          <input type="checkbox"
            id="TOS"
            name="TOS"
          />
          <label htmlFor="TOS">
            I have read and agree to the Terms of Service, Privacy Policy and Community Guidelines.
          </label>
        </div>

        <div>
          <input type="checkbox" />
          <label htmlFor="emailUpdates">
            I would like to receive emails and updates about Logger.
          </label>
        </div>

        {
          errors.serverMessage && <div>{errors.serverMessage}</div>
        }

        <button type="submit">
          Sign Up
        </button>

      </form>
      <div>Already have an account? <Link to="/login" relative="path">Sign in</Link></div>

    </div>
  )
}
export default Register;

