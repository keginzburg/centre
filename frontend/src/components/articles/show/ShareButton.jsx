import { useState } from "react";

import { copyCurrentUrl } from "../../util/util"

import { GoShare } from "react-icons/go";

import "./ShareButton.css";

const ShareButton = () => {
    const [shareTip, setShareTip] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);

    const handleShareTip = () => {
        setShareTip(prev => !prev);
    }

    const clickHandler = e => {
        copyCurrentUrl(e);
        setShareClicked(true);
        setTimeout(() => setShareClicked(false), 2000);
    }

    return (
        <div id="share-button-container">
            {shareTip ? 
            <p id="share-button-tip" className={shareClicked ? "clicked" : null}>
                {shareClicked ? "URL Copied!" : "Share"}
            </p>
            :
            null
            }
            <GoShare 
                onClick={clickHandler}
                onMouseEnter={handleShareTip}
                onMouseLeave={handleShareTip}
            />
        </div>
    )
}

export default ShareButton;