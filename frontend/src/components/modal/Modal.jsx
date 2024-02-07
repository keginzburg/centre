import { useDispatch } from "react-redux";
import { clearModals } from "../../store/ui";

import "./Modal.css";

function Modal({children}) {
    const dispatch = useDispatch();

    return (
        <div id="modal-container">
            <div id="modal-background"></div>
            <div id="modal">
                <div
                    id="modal-exit"
                    onClick={() => dispatch(clearModals())}
                ><i className="fa-solid fa-x"></i>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;