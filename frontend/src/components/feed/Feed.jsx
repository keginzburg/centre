import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import FeedNav from "./FeedNav";

import './Feed.css';

function Feed() {
    const currentUser = useSelector(state => state.session.user);

    if (!currentUser) return <Navigate to="/" replace={true} />;

    return (
        <>
            <FeedNav />
            {/* <FeedIndex /> */}
            {/* <SideBar /> */}
        </>
    )
}

export default Feed;