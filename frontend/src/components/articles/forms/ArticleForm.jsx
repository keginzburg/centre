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

    if (!currentUser) navigate("/");

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
        // `setAnimate` to true to ensure frontend errors will mount the DOM once again.
        setAnimate(true);

        // `validate` is invoked to gather frontend errors and conditional ensures that truthy values will be added to `errors` state variable.
        const errors = validate();
        if (Object.values(errors).filter(err => err !== null).length !== 0) {
            setErrors(errors);
            return;
        }

        // If no errors are gathered, then `loading` is set to true to start PulseLoader component animation and `errors` is set to empty object to clear previous frontend errors.
        setLoading(true);
        setErrors({});

        // As articles can have an attached photo, FormData is used to append that photo file data.
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

    // handler for photo preview HTML element to remove photo data, url, and photo file from file <input> element on a `Backspace` key detection.
    const handlePhotoDelete = e => {
        document.addEventListener('keydown', e => {
            if (e.keyCode == 8) {
                document.getElementById("article-photo-upload").value = "";
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