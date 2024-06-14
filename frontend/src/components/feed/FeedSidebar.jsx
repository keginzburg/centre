import FollowSuggest from "./FollowSuggest";

const FeedSidebar = () => {
    return (
        <div id="feed-sidebar">
                    <div id="feed-sidebar-main">
                        <FollowSuggest />

                        {/* <img src={user.photoUrl} alt="profile-photo"/>
                        <h3>{user.name}</h3>
                        <p onClick={() => setSection("followers")}>{user.followerIds.length !== undefined ? user.followerIds.length : user.followerIds.size} followers</p>
                        <p onClick={() => setSection("following")}>{user.followingIds.length !== undefined ? user.followingIds.length : user.followingIds.size} following</p>

                        <ClapperFollowButton currentUser={currentUser} author={user}/> */}
                    </div>
                    <div id="feed-sidebar-links">
                        <a href="https://www.linkedin.com/in/kyleginzburg/" target="_blank" rel="noreferrer">LinkedIn</a>    
                        <a href="https://github.com/keginzburg" target="_blank" rel="noreferrer">GitHub</a>    
                        <a href="https://wellfound.com/u/kyle-ginzburg" target="_blank" rel="noreferrer">Wellfound</a>    
                    </div>
        </div>
    )
};

export default FeedSidebar;