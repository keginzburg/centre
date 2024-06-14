import { useDispatch } from "react-redux";

import { setModal } from "../../store/ui";

function SplashMain() {

    const dispatch = useDispatch();

    return (
        <div id="splash-main">
            <div>
                <h1>Stay curious.</h1>
                <h2>Discover stories, thinking, and expertise from writers on any topic.</h2>
                <button onClick={() => dispatch(setModal('signup'))}>Start reading</button>
            </div>
            <div id="splash-graphic">
                {/* GRAPHIC PLACEHOLDER */}
                {/* <img src={logo} alt="centre-logo" style={{width: 400, height: 400}}/> */}
            </div>
        </div>
    )
}

export default SplashMain;