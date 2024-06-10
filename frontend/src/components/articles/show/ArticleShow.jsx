import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchArticle } from "../../../store/articles";
import { abbreviateDate } from "../../util/util";

import Modal from "../../modal/Modal";
import LoginForm from "../../session/LoginForm";
import SignupForm from "../../session/SignupForm";
import ArticleClap from "./ArticleClap";
import ShareButton from "./ShareButton";
import ArticleDelete from "./ArticleDelete";
import FeedNav from "../../feed/FeedNav";
import ArticleOptions from "./ArticleOptions";
import ArticleFooter from "./ArticleFooter";

import { PulseLoader } from "react-spinners";
import { GoComment } from "react-icons/go";

import './ArticleShow.css';

function ArticleShow() {
    const { articleId } = useParams();
    const dispatch = useDispatch();

    const article = useSelector(state => articleId ? state.entities.articles[articleId] : undefined);
    const author = useSelector(state => article ? state.entities.users[article.authorId] : undefined);

    const modal = useSelector(state => state.ui.modal);
    // const currentUser = useSelector(state => state.session.user);

    const navigate = useNavigate();

    const [imgModal, setImgModal] = useState(false);

    const lineBreakBody = body => {
        return body.split('\r\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
    }

    useEffect(() => {
        window.scrollTo(0,0);
        if (articleId) {
            dispatch(fetchArticle(articleId))
                .catch(async (err) => {
                    // let data;
                    // try {
                    //     data = await err.clone().json();
                    // } catch {
                    //     data = await err.text();
                    // }
                    if (err.status === 404) navigate("/not-found?error=404");
                })
        }
    }, [dispatch, navigate, articleId])

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
            <ArticleFooter />
        </>
    )

    return (
        <>
            {modal === 'login' ? <Modal animate={true}><LoginForm /></Modal> : null}
            {modal === 'login-no-animate' ? <Modal animate={false}><LoginForm /></Modal> : null}
            {modal === 'signup' ? <Modal animate={true}><SignupForm /></Modal> : null}
            {modal === 'signup-no-animate' ? <Modal animate={false}><SignupForm /></Modal> : null}
            {modal === 'get-started' ? <Modal animate={true}><SignupForm getStarted={true} /></Modal> : null}
            {modal === 'delete' ? <Modal animate={false} deletion={true}><ArticleDelete articleId={articleId} /></Modal> : null}
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
                        <ArticleClap article={article} />
                        
                        <GoComment />
                    </div>
                    <div id="share-and-options">
                        <ShareButton />

                        {/* {currentUser && article.authorId === currentUser.id ? */}
                        <ArticleOptions article={article} navigate={navigate} />
                    </div>
                </div>
                <div id="article-show-content">
                    {imgModal &&
                    <div id="img-modal-container" onClick={() => setImgModal(false)}>
                        <img src={article.photoUrl} alt="article photo" id="img-modal" onClick={() => setImgModal(false)} />
                    </div>}
                    {article.photoUrl && <img src={article.photoUrl} alt="article photo" onClick={() => setImgModal(true)}/>}
                    {lineBreakBody(article.body)}
                </div>
            </div>
            </div>
            <ArticleFooter />
        </>
    )
}

export default ArticleShow;