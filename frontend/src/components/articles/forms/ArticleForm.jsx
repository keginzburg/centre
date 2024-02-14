import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postArticle } from '../../../store/articles';
import { autoGrow } from '../../util/util';

import FormNav from './FormNav';
import ArticleError from './ArticleError';

import { PulseLoader } from 'react-spinners';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import './ArticleForm.css';

function ArticleForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [add, setAdd] = useState(false);
    const [publishDisabled, setPublishDisabled] = useState(true);
    const [errors, setErrors] = useState({  "title": null, "body": null });
    const [animate, setAnimate] = useState(true);

    const [loading, setLoading] = useState(false);

    if (!currentUser) return <Navigate to="/" replace="true"/>;

    useEffect(() => {
        if (title !== "" && body !== "") {
            setPublishDisabled(false);
        } else if (title === "" && body === "") {
            setPublishDisabled(true);
        }
    }, [title, body])

    useEffect(() => {
        if (document.getElementById("article-error")) {
            document.getElementById("article-error").addEventListener('animationend', () => {
                setAnimate(false);
            })
        }
    }, [errors])

    const validate = () => {
        let errors = { "title": null, "body": null };
        if (title.length === 0) errors["title"] = "Oops, did you mean to write something so short? Please write more and try publishing again.";
        if (body.length === 0) errors["body"] = "Oops, did you mean to write something so short? Please write more and try publishing again.";
        return errors;
    }

    const renderArticleError = () => {
        if (errors["title"] || errors["body"] || errors["userId"]) return <ArticleError error={errors["title"]} />;
        return null;
    }

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
        formData.append('article[title]', title);
        formData.append('article[body]', body);
        if (photoFile) formData.append('article[photo]', photoFile);

        return dispatch(postArticle(formData))
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

    const handlePhotoDelete = e => {
        console.log(e);
        document.addEventListener('keydown', e => {
            if (e.keyCode == 8) {
                setPhotoFile(null);
                setPhotoUrl(null);
            }        })
        // console.log(e.keyCode);
        // if (e.keyCode == 8) {
        //     setPhotoFile(null);
        //     setPhotoUrl(null);
        // }
    }

    let preview;
    if (photoUrl) preview = <img
                                id="preview-photo-upload"
                                src={photoUrl}
                                alt="photo preview"
                                onFocus={handlePhotoDelete}
                                tabIndex={0}
                            />;

    if (loading) return (
        <>
            <FormNav 
                publishDisabled={publishDisabled}
                handleSubmit={handleSubmit}
            />
            <form id="article-form">
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
            <form id="article-form">
                {animate && renderArticleError()}
                <input
                    type="text"
                    value={title}
                    id="title"
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />

                <textarea
                    type="text"
                    value={body}
                    onInput={autoGrow}
                    id="body"
                    placeholder='Tell your story...'
                    onChange={e => setBody(e.target.value)}
                />

                <div id="additional">
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
                </div>

                {preview}
            </form>
        </>
    )
}

export default ArticleForm;