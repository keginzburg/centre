import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import * as sessionActions from '../../store/session';
import { convertEmailToLocal, obscureEmail } from "../util/util";

import { PiUserCircleDuotone } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import profile from "./profile-icon.png";

import './ProfileButton.css';

function ProfileButton() {
    const {pathname} = useLocation();

    const dispatch = useDispatch();    
    const currentUser = useSelector(state => state.session.user);
    
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = e => {
        e.stopPropagation();
        if (showMenu) {
            setShowMenu(false);
            return;
        }
        setShowMenu(true);
    };

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false);
        }
        if (showMenu) {
            document.addEventListener('click', closeMenu);
            return () => document.removeEventListener('click', closeMenu);
        }
    }, [showMenu])

    if (pathname === '/new-story') return (
        <>
            <div id="profile" onClick={openMenu} >
                {currentUser ? <img src={currentUser.photoUrl ? currentUser.photoUrl : profile} id="profile-photo" alt="profile pic" /> : <PiUserCircleDuotone id="profile-nav-icon" />}
                {showMenu && (
                    <>
                    <div id="dropdown-menu-pointer" />
                    <div id="dropdown-menu-alternate">
                        <div id="dropdown-user-info">
                            <Link to={`/users/${currentUser.id}`} id="user-info">
                                {currentUser ? <img src={currentUser.photoUrl} id="profile-photo-icon" alt="profile pic" /> : <PiUserCircleDuotone id="profile-nav-icon" />}
                                <div id="user-info-details">
                                    <span>{currentUser.name}</span>
                                    <span>{convertEmailToLocal(currentUser.email)}</span>
                                </div>
                            </Link>
                        </div>
                        <div id="dropdown-nav-links">
                            <Link to={`/users/${currentUser.id}`} id="profile">
                                <span id="no-icon">Profile</span>
                            </Link>
                        </div>
                        <div id="dropdown-personal-links">
                            <a href="https://www.linkedin.com/in/kyleginzburg/" target="_blank" rel="noreferrer">LinkedIn</a>    
                            <a href="https://github.com/keginzburg" target="_blank" rel="noreferrer">GitHub</a>    
                            <a href="https://wellfound.com/u/kyle-ginzburg" target="_blank" rel="noreferrer">Wellfound</a>  
                        </div>
                        <div id="dropdown-auth">
                            <button onClick={() => dispatch(sessionActions.logout())}>
                                <span>Sign out</span>
                            </button>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </>
    )

    return (
        <>
            <div id="profile" onClick={openMenu}>
                {currentUser ? <img src={currentUser.photoUrl ? currentUser.photoUrl : profile} id="profile-photo" alt="profile pic" /> : <PiUserCircleDuotone id="profile-nav-icon" />}
                {showMenu && (
                    <div id="dropdown-menu">
                        <div id="dropdown-nav-links">
                            <Link to={`/users/${currentUser.id}`} id="profile">
                                <FiUser id="profile-icon"/>
                                <span>Profile</span>
                            </Link>
                        </div>
                        <div id="dropdown-personal-links">
                            <a href="https://www.linkedin.com/in/kyleginzburg/" target="_blank" rel="noreferrer">LinkedIn</a>    
                            <a href="https://github.com/keginzburg" target="_blank" rel="noreferrer">GitHub</a>    
                            <a href="https://wellfound.com/u/kyle-ginzburg" target="_blank" rel="noreferrer">Wellfound</a>  
                        </div>
                        <div id="dropdown-auth">
                            <button onClick={() => dispatch(sessionActions.logout())}>
                                <span>Sign out</span>
                                <span>{obscureEmail(currentUser.email)}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfileButton;