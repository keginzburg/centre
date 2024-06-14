import { Link } from "react-router-dom";

import ClapperFollowButton from "../follows/ClapperFollowButton";

import "./FollowSuggestIndexItem.css";

const FollowSuggestIndexItem = ({user, currentUser}) => {
    
    return (
        <li id="follow-suggest-index-item">
            <div id="suggest-details">
                <img src={user.photoUrl} alt="suggest-image"/>
                <Link to={`/users/${user.id}`}>
                    <h2>{user.name}</h2>
                </Link>
            </div>
            <ClapperFollowButton currentUser={currentUser} author={user} />
        </li>
    )
};

export default FollowSuggestIndexItem;