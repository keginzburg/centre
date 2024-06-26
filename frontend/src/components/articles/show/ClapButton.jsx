import { PiHandsClappingThin } from "react-icons/pi";
import { PiHandsClappingFill } from "react-icons/pi";

import confetti from './confetti-62.png';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createClap, updateClap } from "../../../store/clap";

import "./ClapButton.css";
import { setModal } from "../../../store/ui";

const ClapButton = ({owned, existingClap, articleId}) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const clapError = useSelector(state => state.error.clap);

    const [ownedTip, setOwnedTip] = useState(false);
    const [clapTip, setClapTip] = useState(false);
    const [clapClicked, setClapClicked] = useState(false);

    const ownedToolTip = () => setOwnedTip(prev => !prev);
    const clapToolTip = () => setClapTip(prev => !prev);

    const handleClap = () => {
        if (!currentUser) {
            dispatch(setModal("signup"));
            return;
        }

        if (clapClicked) return;

        setClapClicked(true);

        if (existingClap) {
            dispatch(updateClap(existingClap.id))
        } else {
            let clap = {
                clappableType: "Article",
                clappableId: articleId,
                amount: 1
            }
            dispatch(createClap(clap))
        }
        setTimeout(() => setClapClicked(false), 900);
    }

    if (owned) return (
        <div id="clap-button-owned" onMouseEnter={ownedToolTip} onMouseLeave={ownedToolTip}>
            {ownedTip && <p id="owned-tip">You cannot applaud your own story</p>}
            <PiHandsClappingThin />
        </div>
    )

    return (
        <div id="clap-button" onMouseEnter={clapToolTip} onMouseLeave={clapToolTip} onClick={handleClap}>
            {clapTip && !clapClicked && <p id="clap-tip">Clap</p>}
            <div id="clap-icon">
                {clapClicked && <p id="clap-tip-count">+{existingClap && existingClap.amount}</p>}
                {clapClicked && <img src={confetti} id="confetti-effect" alt="confetti-effect" />}
                {existingClap ? <PiHandsClappingFill id="clap-icon-svg" className={clapError ? 'clap-error' : null}/> : <PiHandsClappingThin id="clap-icon-svg"className={clapError ? 'clap-error' : null}/>}
            </div>
        </div>
    )
};

export default ClapButton;