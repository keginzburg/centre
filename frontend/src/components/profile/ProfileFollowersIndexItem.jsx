import { Link, useNavigate } from "react-router-dom";

import ClapperFollowButton from "../follows/ClapperFollowButton";

import "./ProfileFollowersIndexItem.css";


const ProfileFollowersIndexItem = ({follower, currentUser, setSection}) => {
    const navigate = useNavigate();
    
    const handleProfileChange = () => {
        setSection("main");
        navigate(`/users/${follower.id}`);
    }

    return (
        <div id="profile-follower-index-item">
            <Link onClick={handleProfileChange}>
                <img src={follower.photoUrl} alt="follower-thumbnail" />
                <h2>{follower.name}</h2>
            </Link>
            <ClapperFollowButton currentUser={currentUser} author={follower}/>
        </div>
    )
}

export default ProfileFollowersIndexItem;