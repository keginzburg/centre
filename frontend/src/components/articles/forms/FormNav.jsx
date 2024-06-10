import logo from "./logo-128.png";

import { useState } from "react";
import { Link } from "react-router-dom";

import ProfileButton from "../../profile/ProfileButton";

import { CiBellOn } from "react-icons/ci";

import './FormNav.css';

function FormNav({publishDisabled, handleSubmit}) {
    const [publishMessage, setPublishMessage] = useState(false);

    return (
        <>
            <div id="form-nav">
                <div id="logo">
                    <Link to="/feed">
                        <img src={logo} alt="centre logo" />
                    </Link>
                </div>
                <div id="article-tools">
                    <button id={publishDisabled ? 'disabled' : 'publish'}
                            onClick={publishDisabled ? null : handleSubmit}
                            onMouseEnter={publishDisabled ? () => setPublishMessage(true) : null}
                            onMouseLeave={publishDisabled ? () => setPublishMessage(false) : null}
                    >
                        <span>Publish</span>
                        {publishMessage &&
                        <>
                            <div id="publish-message">
                                Publishing will become available after you start writing.
                            </div>
                            <div id="publish-message-after" />
                        </>
                        }
                    </button>
                    <Link to="/feed" id="notifications"><CiBellOn id="notifications-icon" /></Link>
                    <ProfileButton />
                </div>
            </div>
        </>
    )
}

export default FormNav;