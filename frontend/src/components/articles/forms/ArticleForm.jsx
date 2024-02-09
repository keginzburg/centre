import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FormNav from './FormNav';

import './ArticleForm.css';

function ArticleForm() {

    const currentUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    if (!currentUser) return <Navigate to="/" replace="true"/>;

    const handleSubmit = () => {

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

                <input
                    type="text"
                    value={body}
                    id="body"
                    placeholder='Tell your story...'
                    onChange={e => setBody(e.target.value)}
                />
            </form>
        </>
    )
}

export default ArticleForm;