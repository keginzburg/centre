import SplashNav from "./SplashNav";
import SplashMain from "./SplashMain";
import TrendingIndex from "./Trending/TrendingIndex";
import Footer from "./Footer";

import Modal from "../modal/Modal";
import LoginForm from '../session/LoginForm';

import { useSelector } from "react-redux";

import "./Splash.css";

function Splash() {
    const modal = useSelector(state => state.ui.modal);

    return (
        <>
            {modal === 'login' ? <Modal><LoginForm /></Modal> : null}
            <SplashNav />
            <SplashMain />
            <TrendingIndex />
            <Footer />
        </>
    )
}

export default Splash;