import { useDispatch } from "react-redux";
import { clearModals } from "../../store/ui";

import "./Modal.css";

function Modal({animate, children, deletion, type}) {
    const dispatch = useDispatch();

    const modalClose = () => {
        document.getElementById("modal").classList.add("modal-animate2");
        document.getElementById("modal-container").classList.add("modal-animate2");
        document.getElementById("modal-container").addEventListener("animationend", () => {
            dispatch(clearModals());
        });
    }

    const modalCloseNoAnimate = () => {
        dispatch(clearModals());
    }

    
    if (type === 'claps') return (
        <div id="modal-container" className={animate ? "modal-animate1" : null} onClick={() => deletion ? modalCloseNoAnimate() : modalClose()}>
            <div id="modal-background"/>
            <div id="modal-claps" className={animate ? "modal-animate3" : null} onClick={e => e.stopPropagation()}>
                <div
                    id="modal-exit-claps"
                    onClick={() => deletion ? modalCloseNoAnimate() : modalClose()}
                ><i className="fa-solid fa-x"></i>
                </div>
                {children}
            </div>
        </div>
    )

    return (
        <div id="modal-container" className={animate ? "modal-animate1" : null} onClick={() => deletion ? modalCloseNoAnimate() : modalClose()}>
            <div id="modal-background"/>
            <div id="modal" className={animate ? "modal-animate1" : null} onClick={e => e.stopPropagation()}>
                <div
                    id="modal-exit"
                    onClick={() => deletion ? modalCloseNoAnimate() : modalClose()}
                ><i className="fa-solid fa-x"></i>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;