// import { useEffect } from "react";
import { useSelector } from "react-redux";

import { PulseLoader } from "react-spinners";

import FollowSuggestIndexItem from "./FollowSuggestIndexItem";

import "./FollowSuggest.css";

const FollowSuggest = () => {
    const users = useSelector(state => state.entities.users ? state.entities.users : undefined);
    const currentUser = useSelector(state => state.session.user ? state.session.user : undefined);

    let suggestedUsers = [];
    let userArr = Object.values(users);
    for (let i=0; i<userArr.length; i++) {
        if (suggestedUsers.length === 3) break;
        let user = userArr[i];
        if (!currentUser.followingIds.has(user.id) && currentUser?.id !== user.id) {
            suggestedUsers.push(<FollowSuggestIndexItem user={user} currentUser={currentUser} key={user.id}/>);
        }
    }

    if (!users || !currentUser) return (
        <div id="feed-sidebar-follow-suggest">
            <h1>Who To Follow</h1>
            <PulseLoader
                // id="follow-suggest-loader" 
                color="#191919"
                margin={4}
                size={10}
                speedMultiplier={1}
                />
        </div>
    )

    if (suggestedUsers.length === 0) {
        return (
            <div id="feed-sidebar-follow-suggest">
                <h1>There&apos;s No One Left To Follow!</h1>
            </div>
        )
    }
    
    return (
        <div id="feed-sidebar-follow-suggest">
            <h1>Who To Follow</h1>
            <ul>
                {suggestedUsers}
            </ul>
        </div>
    )
};

export default FollowSuggest;