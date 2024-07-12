/*import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import { useLoginMutation, useSendLogoutMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
//import useTitle from '../../hooks/useTitle'
//import PulseLoader from 'react-spinners/PulseLoader'

import './temporaryCss.css'
import { useAppDispatch } from '../../hooks/useStore'
import { setCredentials } from './authSlice'

const Login = () => {
    //useTitle('Dynamic page title')

    const emailRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLParagraphElement>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [login, { isLoading }] = useLoginMutation()

    //LOGOUT - 
    const [sendLogout, {
        //isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        sendLogout('')
        if(isSuccess) {
            console.log(`logged out Successfully`)
        }
    }
    //LOGOUT 

    useEffect(() => {
        if(emailRef && emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken, user }))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (err:any) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            //errRef.current.focus();
        }
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleToggle = () => setPersist((prev: boolean) => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    //if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public">
            <header>
                <h1>user Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Email:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={emailRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="on"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>

                    <button className="form__submit-button" onClick={handleLogout}>Logout</button>


                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        stay logged in
                    </label>
                </form>
            </main>
            <footer>
                
            </footer>
        </section>
    )

    return content
}
export default Login
*/

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../app/api/apiSlice';
import {  useDispatch} from 'react-redux';
import { setUser } from '../../app/store/slices/userSlice';
import { AppDispatch } from '../../app/store/store';
import { RootState } from '../../app/store/store';
import { loginSuccess } from '../../app/store/slices/authSlice';


type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch()
  
  const [loginUser] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
//Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();    
       
      dispatch(loginSuccess({
        user: response.user,
        accessToken: response.token
    })); 
        console.log('Login successful:', response);
        navigate('/');
      
    } catch (err:any) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-left font-semibold my-7'>Sign In</h1>
    <div className='flex gap-2 mt-5 justify-center'>
      <p>Don't have an account?</p>
      <Link to='/signup'>
        <span className='text-blue-500'>Create now</span>
      </Link>
    </div>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>      
      <div className='flex flex-col'>
        <label htmlFor='email' className='mb-1'>Email</label>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password' className='mb-1'>Password</label>
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.password}
          required
        />
      </div>      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
          type='submit'
          className={`bg-blue-500 text-white p-3 rounded-lg mt-9 w-80 mx-auto ${(!formData.email || !formData.password) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!formData.email || !formData.password}
        >
          Sign In
        </button>
    </form>
  </div>
  );
};

export default Login;
