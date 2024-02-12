import logo from "./logo-128.png";

import { Link } from "react-router-dom";

import ProfileButton from "../../profile/ProfileButton";

import { CiBellOn } from "react-icons/ci";

import './FormNav.css';

function FormNav() {
    return (
        <>
            <div id="form-nav">
                <div id="logo">
                    <Link to="/feed">
                        <img src={logo} alt="centre logo" />
                    </Link>
                </div>
                <div id="article-tools">
                    <button id="publish">
                        <span>Publish</span>
                    </button>
                    <Link to="/feed" id="notifications"><CiBellOn id="notifications-icon" /></Link>
                    <ProfileButton />
                </div>
            </div>
        </>
    )
}

export default FormNav;