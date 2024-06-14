import logo from "./logo-128.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../store/ui";

import ProfileButton from "../profile/ProfileButton";

import { PiNotePencilThin } from "react-icons/pi";

import './FeedNav.css';

function FeedNav() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const renderAuth = (currentUser) => {
        if (currentUser) {
            return (
                <>
                    <Link to="/new-story" id="write">
                        <PiNotePencilThin id="write-icon" />
                        <span>Write</span>
                    </Link>
                    {/* <Link to="/feed" id="notifications"><CiBellOn id="notifications-icon" /></Link> */}
                    <ProfileButton />
                </>
            )
        } else {
            return (
                <>
                    <Link id="write" onClick={() => dispatch(setModal('signup'))}>
                        <PiNotePencilThin id="write-icon" />
                        <span>Write</span>
                    </Link>
                    <button id="auth-signup" onClick={() => dispatch(setModal('signup'))}>Sign up</button>
                    <button id="auth-login" onClick={() => dispatch(setModal('login'))}>Sign in</button>
                </>
            )
        }
    }

    return (
        <>
            <div id="feed-nav">
                <div id="logo">
                    <Link to="/feed">
                        <img src={logo} alt="centre logo" />
                    </Link>
                    {currentUser ? null : <Link to="/feed" style={{textDecoration: "none", color: "#242424"}}>
                        <h1 id="logo-wordmark">Centre</h1>
                    </Link>}
                </div>
                <div id="feed-tools">
                    {renderAuth(currentUser)}
                </div>
            </div>
        </>
    )
}

export default FeedNav;