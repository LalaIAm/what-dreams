import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, updateProfile } from '../store/features/auth.slice';
import { auth, createUserWithEmailAndPassword } from '../services/firebase';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      return alert('Please enter your name');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
        })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form onSubmit={handleSignup} className='signin-form'>
      <div className='form-group mb-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Your Name'
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className='form-group mb-2'>
        <input
          type='text'
          className='form-control'
          placeholder='You@Email.com'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className='form-group mb-4'>
        <input
          id='password-field'
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          toggle='#password-field'
          className='fa fa-fw fa-eye field-icon toggle-password'
        ></span>
      </div>

      <div className='form-group mb-2'>
        <button
          type='submit'
          className='form-control btn btn-primary submit px-3'
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
