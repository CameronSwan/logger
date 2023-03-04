import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LogIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    setErrors({})
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div><label htmlFor="inputEmail">
          Email
        </label>
          <div>
            <input type="text"
              id="inputEmail"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inputPassword">
            Password
          </label>
          <div>
            <input type="password"
              id="inputPassword"
              name="password"
              onChange={e => setPassword(e.target.value)}
            />
            <div>Forgot Password?</div>
          </div>
        </div>

        {
          errors.serverMessage && <div>{errors.serverMessage}</div>
        }

        <button
          type="submit">
          Log In
        </button>

      </form>
      <div>Don't have an account? <Link to="/register" relative="path">Sign up</Link></div>
    </div>
  );
}

export default LogIn;