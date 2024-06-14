import { useSelector } from "react-redux";

import { PiCaretRightLight } from "react-icons/pi";

import ProfileFollowersIndexItem from "./ProfileFollowersIndexItem";

import "./ProfileFollowers.css";

const ProfileFollowers = ({user, handleMainSection, type, setSection}) => {
    const currentUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.entities.users ? state.entities.users : undefined);
    
    let followers;
    let following;
    if (type === "followers") {
        if (user) {
            if (Array.isArray(user.followerIds)) {
                followers = user.followerIds.map((followerId) => users[followerId]);
            } else {
                let followerArr = [...user.followerIds];
                followers = followerArr.map((followerId) => users[followerId]);
            }
        }
    } else {
        if (user) {
            if (Array.isArray(user.followingIds)) {
                following = user.followingIds.map((followingId) => users[followingId]);
            } else {
                let followingArr = [...user.followingIds];
                following = followingArr.map((followingId) => users[followingId]);
            }
        }
    }

    if (!followers && !following) return "Loading";

    return (
        <div id="profile-followers">
            <p><span onClick={handleMainSection}>{user.name}</span> <PiCaretRightLight id="profile-caret" />  {type === "followers" ? "Followers" : "Following"}</p>
            {type === "followers" ?
            <h1>{followers.length} {followers.length === 1 ? "Follower" : "Followers"}</h1>
                :
            <h1>{following.length} Following</h1>}
            <div id="profile-followers-index">
                {type === "followers" ?
                followers.map((follower, idx) => {
                    return (
                        <ProfileFollowersIndexItem follower={follower} key={idx} currentUser={currentUser} setSection={setSection}/>
                    )
                })
                :
                following.map((following, idx) => {
                    return (
                        <ProfileFollowersIndexItem follower={following} key={idx} currentUser={currentUser} setSection={setSection}/>
                    )
                })
                }
            </div>
        </div>
    )
};

export default ProfileFollowers;