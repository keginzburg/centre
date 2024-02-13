import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchArticle } from "../../../store/articles";
import { abbreviateDate } from "../../util/util";

import Modal from "../../modal/Modal";
import LoginForm from "../../session/LoginForm";
import SignupForm from "../../session/SignupForm";
import FeedNav from "../../feed/FeedNav";

import { PulseLoader } from "react-spinners";
import { PiHandsClappingThin } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import { GoShare } from "react-icons/go";

import './ArticleShow.css';

function ArticleShow() {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const article = useSelector(state => articleId ? state.entities.articles[articleId] : undefined);
    const author = useSelector(state => article ? state.entities.users[article.authorId] : undefined);
    const modal = useSelector(state => state.ui.modal);

    const navigate = useNavigate();

    const [imgModal, setImgModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
        if (articleId) {
            dispatch(fetchArticle(articleId))
                .catch(async (err) => {
                    let data;
                    try {
                        data = await err.clone().json();
                    } catch {
                        data = await err.text();
                    }
                    if (err.status === 404) navigate("/not-found?error=404");
                })
        }
    }, [dispatch, articleId])

    if (!article || !author) return (
        <>
            <FeedNav />
            <div id="article-show-container">
                <PulseLoader 
                    color="#191919"
                    margin={4}
                    size={15}
                    speedMultiplier={1}
                />
            </div>
        </>
    )

    return (
        <>
            {modal === 'login' ? <Modal animate={true}><LoginForm /></Modal> : null}
            {modal === 'login-no-animate' ? <Modal animate={false}><LoginForm /></Modal> : null}
            {modal === 'signup' ? <Modal animate={true}><SignupForm /></Modal> : null}
            {modal === 'signup-no-animate' ? <Modal animate={false}><SignupForm /></Modal> : null}
            {modal === 'get-started' ? <Modal animate={true}><SignupForm getStarted={true} /></Modal> : null}
            <FeedNav />
            <div id="article-show">
            <div id="article-show-container">
                <h1>{article.title}</h1>
                <div id="article-show-details">
                    <Link><img src={author.photoUrl} alt="author-thumbnail" /></Link>
                    <div id="article-show-addl">
                        <div id="article-show-user-info">
                            <span><Link>{author.name}</Link></span>
                            <span>·</span>
                            <span>Follow</span>
                        </div>
                        <div id="article-show-article-info">
                            <span>{article.minRead} min read</span>
                            <span>·</span>
                            <span>{abbreviateDate(article.updatedAt)}</span>
                        </div>
                    </div>
                </div>
                <div id="article-show-functionality">
                    <div id="clap-and-comment">
                        <PiHandsClappingThin />
                        <GoComment />
                    </div>
                    <div id="share">
                        <GoShare />
                    </div>
                </div>
                <div id="article-show-content">
                    {imgModal &&
                    <div id="img-modal-container" onClick={() => setImgModal(false)}>
                        <img src={article.photoUrl} alt="article photo" id="img-modal" onClick={() => setImgModal(false)} />
                    </div>}
                    {article.photoUrl && <img src={article.photoUrl} alt="article photo" onClick={() => setImgModal(true)}/>}
                    <p>{article.body}</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default ArticleShow;