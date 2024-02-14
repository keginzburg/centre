import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { setModal } from "../../../store/ui";

import { IoEllipsisHorizontal } from "react-icons/io5";

import './ArticleOptions.css';

function ArticleOptions() {
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const [dropdown, setDropdown] = useState(false);

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

    const openDeleteModal = e => {
        e.stopPropagation();
        dispatch(setModal("delete"));
    }

    return (
        <div style={{position: 'relative'}} onBlur={handleBlur} tabIndex={0}>
            <IoEllipsisHorizontal onClick={handleToggle} />
            {dropdown && 
            <div id="article-options-dropdown" ref={inputRef}>
                <span>Edit story</span>
                <span onClick={openDeleteModal}>Delete story</span>
            </div>
            }
        </div>
    )
}

export default ArticleOptions;