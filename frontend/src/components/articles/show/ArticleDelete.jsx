import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearModals } from "../../../store/ui";

import './ArticleDelete.css';
import { PulseLoader } from "react-spinners";
import { deleteArticle } from "../../../store/articles";

function ArticleDelete({articleId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const closeModal = e => {
        e.stopPropagation();
        dispatch(clearModals());
    }

    const handleDelete = e => {
        e.preventDefault();
        
        setLoading(true);

        return dispatch(deleteArticle(articleId))
            .catch(async (err) => {
                let data;
                try {
                    data = await err.clone().json();
                } catch {
                    data = await err.text();
                }
                if (data?.errors) navigate(`/error?error=${err.status}`);
                console.error(err.statusText);
            })
            .then(async () => {
                setLoading(false);
                navigate(`/feed`);
            })
    }

    if (loading) return (
        <div id="delete-modal">
            <PulseLoader
                color="#191919"
                margin={4}
                size={15}
                speedMultiplier={1}
            />
        </div>
    )

    return (    
        <div id="delete-modal">
            <h1>Delete story</h1>
            <p>Deletion is not reversible, and the story will be completely deleted.</p>
            <div id="cancel-and-delete">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ArticleDelete;