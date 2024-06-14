import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../../store/articles";
import { clearArticleIds } from "../../../store/ui";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import ArticleIndexItem from "./ArticleIndexItem";

import './ArticleIndex.css';

function ArticleIndex({currentUser}) {
    const [clicked, setClicked] = useState("all");
    const dispatch = useDispatch();
    const articles = useSelector(state => state.entities.articles);
    const users = useSelector(state => state.entities.users);
    const articleIds = useSelector(state => state.ui.articleIds);

    useEffect(() => {
        dispatch(fetchArticles('index'));
        return () => dispatch(clearArticleIds());
    }, [dispatch])

    let articlesList;
    
    if (Object.keys(articles).length === 0 || Object.keys(users).length === 0 || !articleIds) return (
        <div id="article-index-container">
            <div id="topics-slider">

            </div>
            <div id="article-index">
                {articlesList}
            </div>
        </div>
    )
    if (clicked === "following") {
        articlesList = Object.values(articles).filter(article => currentUser.followingIds.has(article.authorId)).map((followedArticle, idx) => {
            return <ArticleIndexItem key={idx} article={followedArticle} author={users[followedArticle.authorId]} />;
        })
    } else {
        articlesList = articleIds.map((articleId, idx) => {
            let article = articles[articleId];
            return <ArticleIndexItem key={idx} article={article} author={users[article.authorId]} />;
        });
    }

    return (
        <div id="article-index-container">
            <div id="topics-slider">
                <button
                    id="topics-all"
                    className={clicked === "all" ? "clicked" : null}
                    onClick={() => setClicked("all")}
                >All</button>
                <button 
                    id="topics-following"
                    className={clicked === "following" ? "clicked" : null}
                    onClick={() => setClicked("following")}
                >Following</button>
            </div>
            <div id="article-index">
                {articlesList}
                <div id="caught-up-container">
                    <IoMdCheckmarkCircleOutline id="caught-up-icon"/>
                    <p>You&apos;re all caught up!</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleIndex;