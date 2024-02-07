import logo from "./logo-128.png";

import { useDispatch } from "react-redux";

import { setModal } from "../../store/ui";

function SplashNav() {
    const dispatch = useDispatch();

    return (
        <>
            <div id="nav">
                <div id="logo">
                    <img src={logo} alt="centre logo" />
                    <h1>Centre</h1>
                </div>
                <div id="auth-links">
                    <button onClick={() => dispatch(setModal('login'))}>Sign in</button>
                    <button onClick={() => dispatch(setModal('signup'))}>Get started</button>
                </div>
            </div>
        </>
    )
}

export default SplashNav;