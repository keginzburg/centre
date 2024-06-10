import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchArticle, patchArticle } from '../../../store/articles';
import { autoGrow } from '../../util/util';

import FormNav from './FormNav';
import ArticleError from './ArticleError';

import { PulseLoader } from 'react-spinners';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import './ArticleEditForm.css';

function ArticleEditForm() {
    const { articleId } = useParams();

    const ref = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const article = useSelector(state => state.entities.articles[articleId] ? state.entities.articles[articleId] : null);

    const [title, setTitle] = useState(article ? article.title : "");
    const [body, setBody] = useState(article ? article.body : "");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(article ? article.photoUrl : null);

    const [add, setAdd] = useState(false);
    const [publishDisabled, setPublishDisabled] = useState(true);
    const [errors, setErrors] = useState({  "title": null, "body": null });
    
    const [animate, setAnimate] = useState(true);

    const [loading, setLoading] = useState(false);

    // If there is not current session, then reroute user to Splash.
    if (!currentUser) navigate("/");

    // If the fetched article's author does not match the current session user, then reroute user to Error component with 401 Unauthorized.
    if (article && article.authorId !== currentUser.id) navigate("/not-found?error=401");
    
    // useEffect tracking `articleId` from frontend params to fetch proper Article data. If Article does not exist, then user is rerouted to 404 Error component.
    useEffect(() => {
        window.scrollTo(0,0);
        if (articleId) {
            dispatch(fetchArticle(articleId))
                .then(() => {
                    
                })
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

    // useEffect that tracks for updated article data and then sets state variables to current data. It also informs the `textarea` element to rerender with an appropriate height according to the body's current `scrollHeight` property.
    useEffect(() => {
        if (article) {
            setTitle(article.title);
            setBody(article.body);
            setPhotoUrl(article.photoUrl);
            ref.current.style.height = "auto";
            ref.current.style.height = (ref.current.scrollHeight) + "px";
        }
    }, [article])

    // useEffect tracking `title` and `body` state variables for emptiness and setting `publishDisabled` state variable accordingly
    useEffect(() => {
        if (title !== "" && body !== "") {
            setPublishDisabled(false);
        } else if (title === "" || body === "") {
            setPublishDisabled(true);
        }
    }, [title, body])

    // useEffect tracking frontend `errors` state variable to unmount `ArticleError` component after CSS animation end 
    useEffect(() => {
        if (document.getElementById("article-error")) {
            document.getElementById("article-error").addEventListener('animationend', () => {
                setAnimate(false);
            })
        }
    }, [errors])

    // convenience function that organizes frontend errors based on state variable emptiness; utilized within `handleSubmit` function
    const validate = () => {
        let errors = { "title": null, "body": null };
        if (title.length === 0) errors["title"] = "Oops, did you mean to write something so short? Please write more and try publishing again.";
        if (body.length === 0) errors["body"] = "Oops, did you mean to write something so short? Please write more and try publishing again.";
        return errors;
    }

    // convenience function to return `ArticleError` component if `errors` state variable has collected any frontend errors
    const renderArticleError = () => {
        if (errors["title"] || errors["body"] || errors["userId"]) return <ArticleError error={errors["title"] ? errors["title"] : errors["body"]} />;
        return null;
    }

    // onChange handler for file <input> that stores image file data and sets file url for image preview
    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        }
        else setPhotoUrl(null);
    }
    
    // handler for Article submission
    const handleSubmit = e => {
        e.preventDefault();
        setAnimate(true);

        const errors = validate();
        if (Object.values(errors).filter(err => err !== null).length !== 0) {
            setErrors(errors);
            return;
        }

        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('article[id]', articleId);
        formData.append('article[title]', title);
        formData.append('article[body]', body);
        if (photoFile) formData.append('article[photo]', photoFile)
        if (!photoUrl) formData.append('article[photoDelete]', true)

        return dispatch(patchArticle(formData))
            .catch(async (err) => {
                let data;
                try {
                    data = await err.clone().json();
                } catch {
                    data = await err.text();
                }
                if (data?.errors) setErrors(data.errors);
                console.error(err.statusText);
            })
            .then(data => {
                setLoading(false);
                setTitle("");
                setBody("");
                setPhotoFile(null);
                navigate(`/articles/${data.article.id}`);
            });
    }

    const handlePhotoDelete = () => {
        document.addEventListener('keydown', e => {
            if (e.keyCode == 8) {
                setPhotoFile(null);
                setPhotoUrl(null);
            }        })
    }

    let preview;
    if (photoUrl) preview = <img
                                id="preview-photo-upload"
                                src={photoUrl}
                                alt="photo preview"
                                onFocus={handlePhotoDelete}
                                tabIndex={0}
                            />;

    if (loading || !article) return (
        <>
            <FormNav 
                publishDisabled={publishDisabled}
                handleSubmit={handleSubmit}
            />
            <form id="article-edit-form">
                <PulseLoader
                    color="#191919"
                    margin={4}
                    size={15}
                    speedMultiplier={1}
                />
            </form>
        </>
    )

    return (
        <>
            <FormNav 
                publishDisabled={publishDisabled}
                handleSubmit={handleSubmit}
            />
            <form id="article-edit-form">
                {animate && renderArticleError()}
                <input
                    type="text"
                    value={title}
                    id="title"
                    placeholder='Title'
                    onChange={e => {
                        setTitle(e.target.value)
                    }}
                />

                <textarea
                    type="text"
                    value={body}
                    onInput={autoGrow}
                    id="body"
                    placeholder='Tell your story...'
                    onChange={e => {
                        setBody(e.target.value)
                    }}

                    ref={ref}
                />

                {!photoUrl && <div id="additional">
                    <CiCirclePlus
                        id="add-button"
                        className={add ? "add" : null}
                        onClick={() => setAdd(prev => !prev)}
                    />
                    {add &&
                    <div id="photo-upload-button">
                        <label htmlFor="article-photo-upload">
                            <MdOutlinePhotoSizeSelectActual id="photo-upload-icon" />
                        </label>
                        <input
                            id="article-photo-upload"
                            style={{display: "none"}}
                            type="file"
                            onChange={handleFile}
                        />
                    </div>}
                </div>}

                {preview}
            </form>
        </>
    )
}

export default ArticleEditForm;