import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/features/auth.slice';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        )
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <form onSubmit={handleLogin} className='signin-form'>
      <div className='form-group mb-2'>
        <input
          type='text'
          className='form-control'
          placeholder='You@Email.com'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group mb-4'>
        <input
          id='password-field'
          type='password'
          className='form-control'
          placeholder='Password'
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
          Sign In
        </button>
      </div>
      <div className='form-group d-md-flex'>
        <div className='w-50'>
          <label className='checkbox-wrap checkbox-primary'>
            Remember Me
            <input type='checkbox' defaultChecked />
            <span className='checkmark'></span>
          </label>
        </div>
        <div className='w-50 text-md-right'>
          <Link to='#' style={{ color: '#fff' }}>
            Forgot Password?
          </Link>{' '}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
