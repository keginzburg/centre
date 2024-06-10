import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../../store/articles";

import ArticleIndexItem from "./ArticleIndexItem";

import './ArticleIndex.css';

function ArticleIndex() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.entities.articles);
    const users = useSelector(state => state.entities.users);

    useEffect(() => {
        dispatch(fetchArticles('index'));
    }, [dispatch])

    if (Object.keys(articles).length === 0 || Object.keys(users).length === 0) return (
        <div id="article-index-container">
            <div id="topics-slider">

            </div>
            <div id="article-index">
                {Object.values(articles).map((article, idx) => {
                    return <ArticleIndexItem key={idx} article={article} author={users[article.authorId]} />;
                })}
            </div>
        </div>
    )

    return (
        <div id="article-index-container">
            <div id="topics-slider">

            </div>
            <div id="article-index">
                {Object.values(articles).map((article, idx) => {
                    return <ArticleIndexItem key={idx} article={article} author={users[article.authorId]} />;
                })}
            </div>
        </div>
    )
}

export default ArticleIndex;