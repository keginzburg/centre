import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if (currentUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };

    // const setErrorIcon = (field) => {
    // }

    return (
        <div id="login-form">
            <h1>Sign in with email</h1>
            <p>Enter the email address and password associated with your account.</p>

            <label htmlFor="email">Your email</label>
            <input
                    type="text"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
            />

            <label htmlFor="password">Your password</label>
            <input
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
            />

            <button type="submit">Sign in</button>

            <p>No account? <button>Create one</button></p>
        </div>
    )
}

export default LoginForm;