import logo from "./logo-128.png";

import { Link } from "react-router-dom";

import ProfileButton from "../profile/ProfileButton";

import { PiNotePencilThin } from "react-icons/pi";
import { CiBellOn } from "react-icons/ci";

import './FeedNav.css';

function FeedNav() {
    return (
        <>
            <div id="feed-nav">
                <div id="logo">
                    <Link to="/feed">
                        <img src={logo} alt="centre logo" />
                    </Link>
                </div>
                <div id="feed-tools">
                    <Link to="/new-story" id="write">
                        <PiNotePencilThin id="write-icon" />
                        <span>Write</span>
                    </Link>
                    <Link to="/feed" id="notifications"><CiBellOn id="notifications-icon" /></Link>
                    <ProfileButton />
                </div>
            </div>
        </>
    )
}

export default FeedNav;