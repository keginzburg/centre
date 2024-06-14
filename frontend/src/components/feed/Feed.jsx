import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import FeedNav from "./FeedNav";
import ArticleIndex from "../articles/index/ArticleIndex";
import FeedSidebar from "./FeedSidebar";

import './Feed.css';

function Feed() {
    const currentUser = useSelector(state => state.session.user);

    if (!currentUser) return <Navigate to="/" replace={true} />;

    return (
        <>
            <FeedNav />
            <div id="feed">
                <ArticleIndex currentUser={currentUser} />
                <FeedSidebar />
            </div>
        </>
    )
}

export default Feed;