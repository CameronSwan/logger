import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Checkbox from "./Checkbox";

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
      setVerificationMessage("Passwords must match.")
    } else if (agreeTOS !== true) {
      setTOSMessage("You must agree to the Terms of Service")
    } else {
      authService.register({ username, email, password }, error => {

      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="inputUsername">
            Username
          </label>
          <div>
            <input type="text"
              id="inputUsername"
              name="username"
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <div>
              {
                errors.username && <span>{errors.username.message}</span>
              }
            </div>
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
            <div>
              {
                errors.email && <span>{errors.email.message}</span>
              }
            </div>
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
            <div>
              {
                errors.password && <span>{errors.password.message}</span>
              }
            </div>
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
            <div>
              {
                verificationMessage && <span>{verificationMessage}</span>
              }
            </div>
          </div>
        </div>


        <Checkbox
          label="I have read and agree to the Terms of Service, Privacy Policy and Community Guidelines."
          id="Terms Of Service"
          value={agreeTOS}
          onChange={handleChecked}
        />

        <Checkbox
          id="Email Subscription"
          label="I would like to receive emails and updates about Logger."
        />

        <div>
          {
            errors.serverMessage && <span>{errors.serverMessage}</span>
          }
          {
            TOSMessage && <span>{TOSMessage}</span>
          }
        </div>

        <button type="submit">
          Sign Up
        </button>

      </form>
      <div>Already have an account? <Link to="/login" relative="path">Sign in</Link></div>

    </div>
  )
}
export default Register;

