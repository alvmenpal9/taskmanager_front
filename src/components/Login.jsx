import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const url_login = 'auth/login'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { auth, setAuth, setPersist, persist } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url_login, {
                username: username,
                password: password
            });

            if (response?.status === 200) {
                setAuth(response?.data);
                navigate('/home')
            }

        } catch (error) {
            if (error?.response?.status === 404) {
                setError(true);
                setErrorMessage('Incorrect username or password')
            }
        }
    }

    useEffect(() => {
        localStorage.setItem('trust', persist)
    }, [persist])

    return (
        <>
            <h1>Login</h1>
            {error
                ? <div className="messages">
                    <p>{errorMessage}</p>
                </div>
                : ''
            }
            <form className="form" onSubmit={handleLogin} >
                <div className="input_fields">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} required autoFocus />
                </div>
                <div className="input_fields">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <input type="checkbox" name="trust" onChange={e => setPersist(prev => !prev)} />
                    <label>Trust this device</label>
                    <br/>
                    <br/>
                </div>
                <input type="submit" value="Sign in" />
            </form>
            <p>Not registered yet?</p>
            <Link to='/register'>Create an account</Link>
        </>
    )
}

export default Login;