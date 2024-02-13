import arrow from "./arrow-48.png";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchArticles } from "../../../store/articles";

import TrendingIndexItem from "./TrendingIndexItem";

import { PulseLoader } from 'react-spinners';

function TrendingIndex() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.entities.articles);
    const users = useSelector(state => state.entities.users);

    useEffect(() => {
        dispatch(fetchArticles('trending'));
    }, [dispatch])

    if (Object.keys(articles).length === 0 || Object.keys(users).length === 0) return (
        <div id="trending-main">
            <div id="trending-header">
                <img src={arrow} alt="arrow" />
                Trending on Centre
            </div>
            <div id="trending-index" className="trending-index-loader">
                <PulseLoader
                    color="#191919"
                    margin={4}
                    size={15}
                    speedMultiplier={1}
                />
            </div>
        </div>
    )


    return (
        <div id="trending-main">
            <div id="trending-header">
                <img src={arrow} alt="arrow" />
                Trending on Centre
            </div>
            <div id="trending-index">
                {articles && Object.values(articles).map((article, idx) => {
                    return <TrendingIndexItem key={idx} article={article} author={users[article.authorId]} num={idx+1}/>;
                })}
            </div>
        </div>
    )
}

export default TrendingIndex;