import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import { setModal } from '../../store/ui';

import { MdErrorOutline } from "react-icons/md";

import { PulseLoader } from 'react-spinners';

import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    if (currentUser) return <Navigate to="/feed" replace={true} />;

    const validate = () => {
        let errors = { "email": null, "name": null, "password": null };
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email.length === 0) errors["email"] = "Please enter a valid email address.";
        else if (regex.test(email) === false) errors["email"] = "Please enter a valid email address.";
        if (name.length === 0) errors["name"] = "Please enter a valid name.";
        if (password.length < 6 || password.length > 40) errors["password"] = "Password must be between 6 to 40 characters.";
        return errors;
    }

    const renderError = (field) => {
        switch (field) {
            case 'email':
                return errors["email"] ? <span>{errors["email"]}</span> : null;
            case 'password':
                return errors["password"] ? <span>{errors["password"]}</span> : null;
            case 'name':
                return errors["name"] ? <span>{errors["name"]}</span> : null;
            default:
                return null;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validate();
        if (Object.values(errors).filter(err => err !== null).length !== 0) {
            setErrors(errors);
            return;
        }

        setLoading(true);

        setErrors({});
        return dispatch(sessionActions.signup({email, name, password}))
            .catch(async (err) => {
                let data;
                try {
                    data = await err.clone().json();
                } catch {
                    data = await err.text();
                }
                if (data?.errors) setErrors(data.errors);
                // else if (data) setErrors([data]);
                // else setErrors([res.statusText]);
                console.error(err.statusText)
            })
            .then(() => setLoading(false));
    };

    const handleDemo = e => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        return dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
        .catch(async (err) => {
            let data;
            try {
                data = await err.clone().json();
            } catch {
                data = await err.text();
            }
            if (data?.errors) setErrors(data.errors);
            // else if (data) setErrors([data]);
            console.error(err.statusText);
            // else setErrors([res.statusText]);
        })
        .then(() => setLoading(false));
    }

    if (loading) return (
        <form id="signup-form">
            <PulseLoader
                color="#191919"
                margin={4}
                size={15}
                speedMultiplier={1}
            />
        </form>
    )

    return (
        <form id="signup-form" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <p>Enter your email address, name, and password to create an account.</p>

            <label htmlFor="email" className={errors["email"] ? 'label-error' : null}>
                Your email
                {errors["email"] ? <MdErrorOutline id="email-error-icon"/> : null}
            </label>
            <input
                    type="text"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className={errors["email"] ? 'input-error' : null}
            />
            {renderError("email")}

            <label htmlFor="name" className={errors["name"] ? 'label-error' : null}>
                Your name
                {errors["name"] ? <MdErrorOutline id="name-error-icon"/> : null}
            </label>
            <input
                    type="text"
                    id="name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    className={errors["name"] ? 'input-error' : null}
            />
            {renderError("name")}

            <label htmlFor="password" className={errors["password"] ? 'label-error' : null}>
                Your password
                {errors["password"] ? <MdErrorOutline id="pass-error-icon"/> : null}
            </label>
            <input
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className={errors["password"] ? 'input-error' : null}
            />
            {renderError("password")}

            <button disabled={loading} type="submit">Sign up</button>
            <button disabled={loading} id="demo" onClick={handleDemo}>Demo</button>

            <p>Already have an account? <button onClick={() => {dispatch(setModal('login-no-animate'))}}>Sign in</button></p>
        </form>
    )
}

export default SignupForm;