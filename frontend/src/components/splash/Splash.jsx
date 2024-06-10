import SplashNav from "./SplashNav";
import SplashMain from "./SplashMain";
import TrendingIndex from "./Trending/TrendingIndex";
import Footer from "./Footer";

import Modal from "../modal/Modal";
import LoginForm from '../session/LoginForm';
import SignupForm from "../session/SignupForm";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./Splash.css";

function Splash() {
    const currentUser = useSelector(state => state.session.user);
    const modal = useSelector(state => state.ui.modal);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    if (currentUser) return <Navigate to="/feed" replace="true"/>

    return (
        <>
            {modal === 'login' ? <Modal animate={true}><LoginForm /></Modal> : null}
            {modal === 'login-no-animate' ? <Modal animate={false}><LoginForm /></Modal> : null}
            {modal === 'signup' ? <Modal animate={true}><SignupForm /></Modal> : null}
            {modal === 'signup-no-animate' ? <Modal animate={false}><SignupForm /></Modal> : null}
            <SplashNav />
            <SplashMain />
            <TrendingIndex />
            <Footer />
        </>
    )
}

export default Splash;