import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Auth = ({dispatch}) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='page auth-page img js-fullheight'>
      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6 text-center mb-5'>
              <h1 className='heading-section text-white title'>Dream Keeper</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-md-6 col-lg-4'>
              <div className='login-wrap p-0'>
                <h3 className='mb-4 text-center'>
                  {isLogin ? 'Have an Account?' : 'Need an Account?'}
                </h3>
                {isLogin ? <LoginForm dispatch={dispatch} /> : <SignUpForm dispatch={dispatch} />}
                <p className='w-100 text-center'>&mdash; Or Use &mdash;</p>
                <div className='social d-flex text-center'>
                  <Link to='#' className='px-2 py-2 mr-md-1 rounded m-1'>
                    <span className='ri-facebook-circle-line'> Facebook</span>
                  </Link>
                  <Link to='#' className='px-2 py-2 ml-md-1 m-1 rounded'>
                    <span className='ri-twitter-line mr-2'></span> Twitter
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <p className='text-white text-center'>{isLogin ? "Don't have an account?" : "Already have an account?"} <span onClick={() => toggleLogin()} className="login-toggle">{ isLogin ? "Sign Up": "Sign In" }</span></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
