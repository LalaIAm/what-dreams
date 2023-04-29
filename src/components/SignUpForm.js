import React, {useState} from 'react'

import { useNavigate } from 'react-router-dom'

const SignUpForm = ({dispatch}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const reset = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
   
  }
  
  return (
    <form onSubmit={handleSignup} className='signin-form'>
      <div className='form-group mb-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Your Name'
          required
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className='form-group mb-2'>
        <input
          type='text'
          className='form-control'
          placeholder='You@Email.com'
          required
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
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
}

export default SignUpForm