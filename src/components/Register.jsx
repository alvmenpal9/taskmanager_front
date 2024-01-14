import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const register_url = 'user';
const Register = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [errorMatchPwd, setErrorMatchPwd] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (name && surname && username && password && !errorMatchPwd) {
            try {
                const response = await axios.post(register_url, {
                    name: name,
                    surname: surname,
                    username: username,
                    password: password
                })
                if (response?.data?.status === 200) {
                    setSuccess(true);
                }
            } catch (error) {
                if (error?.response?.status === 400) {
                    setUserExists(true);
                }
            }
        }
    }

    useEffect(() => {
        if (password !== matchPwd) {
            setErrorMatchPwd(true);
        }
        if (password === matchPwd) {
            setErrorMatchPwd(false);
        }
    }, [password, matchPwd])

    return (
        <>
            {success
                ? <div>
                    <h1>Congratulations!</h1>
                    <div className="success">
                        <p>Your account has been created!</p>
                        <Link to='/login'>Sign in now!</Link>
                    </div>
                </div>
                : (
                    <>
                        <h1>Sign Up</h1>
                        {!name || !surname || !username || !password || errorMatchPwd || userExists
                            ? (
                                <div className="messages">
                                    {!name ? <p>Name cannot be empty</p> : ''}
                                    {!surname ? <p>Surname cannot be empty</p> : ''}
                                    {!username ? <p>Username cannot be empty</p> : ''}
                                    {!password ? <p>Password cannot be empty</p> : ''}
                                    {errorMatchPwd ? <p>Passwords must match</p> : ''}
                                    {userExists ? <p>User already exists</p> : ''}
                                </div>
                            )
                            : ''
                        }
                        <form className="form" onSubmit={handleRegister}>
                            <div className="input_fields">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" required autoFocus onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="input_fields">
                                <label htmlFor="surname">Surname</label>
                                <input type="text" name="surname" required onChange={e => setSurname(e.target.value)} />
                            </div>
                            <div className="input_fields">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" required onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="input_fields">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" required onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="input_fields">
                                <label htmlFor="matchpwd">Confirm Password</label>
                                <input type="password" name="matchpwd" required onChange={e => setMatchPwd(e.target.value)} />
                            </div>
                            <input type="submit" value="Sign Up" />
                        </form>
                        <p>Already have an account?</p>
                        <Link to='/login'>Sign in!</Link>
                    </>
                )
            }
        </>
    )
}

export default Register;    