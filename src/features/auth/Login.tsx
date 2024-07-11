import { useRef, useState, useEffect } from 'react'
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
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            //navigate('/dash')
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