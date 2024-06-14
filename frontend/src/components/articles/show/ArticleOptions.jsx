import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../../store/ui";
import { deleteClap } from "../../../store/clap";

import OptionsFollowButton from "../../follows/OptionsFollowButton";

import { IoEllipsisHorizontal } from "react-icons/io5";

import './ArticleOptions.css';

function ArticleOptions({article, navigate, author}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const claps = useSelector(state => state.entities.claps);
    const inputRef = useRef(null);
    const [dropdown, setDropdown] = useState(false);

    if (!currentUser) return null;

    let existingClap;
    if (currentUser) {
        existingClap = Object.values(claps).find(clap => clap.clapperId === currentUser.id && clap.clappableId === article.id && clap.clappableType === "Article");
    }



    const handleToggle = e => {
        e.stopPropagation();
        setDropdown(prev => !prev);
    }

    const handleBlur = e => {
        e.stopPropagation();
        if (!inputRef.current.contains(e.target)) {
            setDropdown(false);            
        }
    }

    const handleEdit = e => {
        e.stopPropagation();
        navigate(`/articles/${article.id}/edit`);
    }

    const handleClapDelete = () => {
        if (!currentUser) {
            dispatch(setModal("signup"));
            return;
        }

        setDropdown(false);

        if (existingClap) {
            dispatch(deleteClap(existingClap.id))
        }
    }

    const openDeleteModal = e => {
        e.stopPropagation();
        dispatch(setModal("delete"));
    }

    if (currentUser && article.authorId === currentUser.id) return (
        <div style={{position: 'relative'}} onBlur={handleBlur} tabIndex={0}>
            <IoEllipsisHorizontal onClick={handleToggle} />
            {dropdown && 
            <div id="article-options-dropdown" ref={inputRef}>
                <span onClick={handleEdit}>Edit story</span>
                <span onClick={openDeleteModal}>Delete story</span>
            </div>
            }
        </div>
    )

    return (
        <div style={{position: 'relative'}} onBlur={handleBlur} tabIndex={0}>
            <IoEllipsisHorizontal onClick={handleToggle} />
            {dropdown && 
            <div id="article-options-dropdown" ref={inputRef}>
                {existingClap ?
                    <span id="undo-claps" onClick={handleClapDelete}>Undo claps</span>
                    :
                    null
                }
                <OptionsFollowButton
                    currentUser={currentUser}
                    author={author}
                    existingClap={existingClap}
                    setDropdown={setDropdown}
                />
            </div>
            }
        </div>

    )

}

export default ArticleOptions;