import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import FormNav from './FormNav';

import { CiCirclePlus } from "react-icons/ci";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import './ArticleForm.css';

function ArticleForm() {

    const currentUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [add, setAdd] = useState(false);

    if (!currentUser) return <Navigate to="/" replace="true"/>;

    // const handleSubmit = () => {

    // }

    const autoGrow = e => {
        console.log("growing");
        if (e.target.value === "") {
            e.target.style.height = "51px";
        } else {
            console.log(e.target.scrollHeight);
            e.target.style.height = "auto";
            e.target.style.height = (e.target.scrollHeight) + "px";
        }
    }

    return (
        <>
            <FormNav />
            <form id="article-form">
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
                    // contentEditable
                    // role='textbox'
                    onInput={autoGrow}
                    id="body"
                    placeholder='Tell your story...'
                    onChange={e => setBody(e.target.value)}
                />

                <div id="additional">
                    <CiCirclePlus id="add-button" className={add ? "add" : null} onClick={() => setAdd(prev => !prev)}/>
                    {add && <div id="photo-upload-button">
                        <MdOutlinePhotoSizeSelectActual id="photo-upload-icon"/>
                    </div>}
                </div>
            </form>
        </>
    )
}

export default ArticleForm;