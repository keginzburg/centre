import { useDispatch } from "react-redux";
import { clearModals } from "../../store/ui";

import "./Modal.css";

function Modal({animate, children}) {
    const dispatch = useDispatch();

    const modalClose = () => {
        document.getElementById("modal").classList.add("modal-animate2");
        document.getElementById("modal-container").classList.add("modal-animate2");
        document.getElementById("modal-container").addEventListener("animationend", () => {
            dispatch(clearModals());
        });
    }

    return (
        <div id="modal-container" className={animate ? "modal-animate1" : null} onClick={() => modalClose()}>
            <div id="modal-background"/>
            <div id="modal" className={animate ? "modal-animate1" : null} onClick={e => e.stopPropagation()}>
                <div
                    id="modal-exit"
                    onClick={() => modalClose()}
                ><i className="fa-solid fa-x"></i>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;