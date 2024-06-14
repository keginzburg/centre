import { useSelector } from "react-redux";

import ProfileMainIndexItem from "./ProfileMainIndexItem";

import "./ProfileMain.css";

const ProfileMain = ({user}) => {
    const articles = useSelector(state => user && state.entities.articles ? state.entities.articles : undefined);

    let authoredArticles = [];
    for (const articleId in user.articleIds) {
        const article = articles[user.articleIds[articleId]];
        authoredArticles.push(
            <ProfileMainIndexItem 
                    article={article}
                    user={user}
                    key={articleId}
                />
        )
    }

    return (
            <div id="profile-main">
                <h1 id="profile-header">{user.name}</h1>
                <div id="profile-articles-index">
                    {authoredArticles}
                </div>
            </div>
    )
};

export default ProfileMain;