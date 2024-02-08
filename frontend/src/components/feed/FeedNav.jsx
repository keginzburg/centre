import logo from "./logo-128.png";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as sessionActions from '../../store/session';

import { PiNotePencilThin } from "react-icons/pi";
import { CiBellOn } from "react-icons/ci";
import { PiUserCircleDuotone } from "react-icons/pi";

function FeedNav() {
    const dispatch = useDispatch();

    return (
        <>
            <div id="feed-nav">
                <div id="logo">
                    <img src={logo} alt="centre logo" />
                </div>
                <div id="feed-tools">
                    <Link to="/feed" id="write">
                        <PiNotePencilThin id="write-icon" />
                        <span>Write</span>
                    </Link>
                    <Link to="/feed"><CiBellOn id="notifications" /></Link>
                    <button onClick={() => { dispatch(sessionActions.logout()) }}><PiUserCircleDuotone /></button>
                </div>
            </div>
        </>
    )
}

export default FeedNav;