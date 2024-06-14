import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/user';

import FeedNav from '../feed/FeedNav';
import ProfileMain from './ProfileMain';
import ProfileFollowers from './ProfileFollowers';

import { PulseLoader } from 'react-spinners';

import "./ProfileShow.css";
import ClapperFollowButton from '../follows/ClapperFollowButton';
import Modal from '../modal/Modal';
import LoginForm from '../session/LoginForm';
import SignupForm from '../session/SignupForm';

const ProfileShow = () => {
    const params = useParams();
    const { userId } = params;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [section, setSection] = useState("main");

    const currentUser = useSelector(state => state.session.user);
    const modal = useSelector(state => state.ui.modal);
    const user = useSelector(state => userId ? state.entities.users[userId] : undefined);
    const error = useSelector(state => state.error.profile ? state.error.profile : undefined);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId, dispatch])

    const handleMainSection = () => setSection("main");

    if (error) navigate('/error?error=404');

    if (!user || !user.followerIds || !user.followingIds) {
        return (
            <>
            <FeedNav />
            <div id="profile-loading">
                    <PulseLoader
                        id="profile-loader"
                        color="#191919"
                        margin={4}
                        size={15}
                        speedMultiplier={1}
                    />
            </div>
        </>
        )
    }

    return (
        <>
            {modal === 'login' ? <Modal animate={true}><LoginForm /></Modal> : null}
            {modal === 'login-no-animate' ? <Modal animate={false}><LoginForm /></Modal> : null}
            {modal === 'signup' ? <Modal animate={true}><SignupForm /></Modal> : null}
            {modal === 'signup-no-animate' ? <Modal animate={false}><SignupForm /></Modal> : null}
            <FeedNav />
            <div id="profile">
                {section === "main" && <ProfileMain user={user}/>}
                {section === "followers" && <ProfileFollowers handleMainSection={handleMainSection} user={user} type={"followers"} setSection={setSection}/>}
                {section === "following" && <ProfileFollowers handleMainSection={handleMainSection} user={user} type={"following"} setSection={setSection}/>}
                <div id="profile-sidebar">
                    <div id="profile-sidebar-main">
                        <img src={user.photoUrl} alt="profile-photo"/>
                        <h3>{user.name}</h3>
                        <p onClick={() => setSection("followers")}>{user.followerIds.length !== undefined ? user.followerIds.length : user.followerIds.size} followers</p>
                        <p onClick={() => setSection("following")}>{user.followingIds.length !== undefined ? user.followingIds.length : user.followingIds.size} following</p>

                        <ClapperFollowButton currentUser={currentUser} author={user}/>
                    </div>
                    <div id="profile-sidebar-links">
                        <a href="https://www.linkedin.com/in/kyleginzburg/" target="_blank" rel="noreferrer">LinkedIn</a>    
                        <a href="https://github.com/keginzburg" target="_blank" rel="noreferrer">GitHub</a>    
                        <a href="https://wellfound.com/u/kyle-ginzburg" target="_blank" rel="noreferrer">Wellfound</a>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileShow;