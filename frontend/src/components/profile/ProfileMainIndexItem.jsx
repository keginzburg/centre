import { abbreviateBody } from "../util/util";
import { Link } from "react-router-dom";

import "./ProfileMainIndexItem.css";

const ProfileMainIndexItem = ({article, user}) => {
    return (
        <Link
            id="profile-articles-index-item"
            to={`/articles/${article.id}`}
        >
            <div id="profile-articles-index-item-author">
                <img src={user.photoUrl}  alt="article-author-thumbnail"/>
                <p>{user.name}</p>
            </div>
            <div id="profile-articles-index-item-main">
                <div id="profile-articles-index-item-title-body">
                    <h2 id="profile-article-title">{article.title}</h2>
                    <p id="profile-article-body">{abbreviateBody(article.body)}</p>
                    <p id="time-and-date">{article.minRead} min read · {article.createdAt}</p>
                </div>
                <div id="profile-articles-index-item-photo">
                    {article.photoUrl ? <img src={article.photoUrl} alt="article-photo"/> : null}
                </div>
            </div>
        </Link>
    )
};

export default ProfileMainIndexItem;