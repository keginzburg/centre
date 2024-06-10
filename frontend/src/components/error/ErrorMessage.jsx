import { Link } from "react-router-dom";

import error from './error.png';

import './ErrorMessage.css';

function ErrorMessage({code}) {
    let errorMessage;

    switch (code) {
        case '401':
            errorMessage = "UNAUTHORIZED";
            break;
        case '403':
            errorMessage = "FORBIDDEN";
            break;
        case '404':
            errorMessage = "PAGE NOT FOUND";
            break;
        case '500':
            errorMessage = "INTERNAL SERVER ERROR";
            break;
        default:
            code = "418";
            errorMessage = "I'M A TEAPOT";
            break;
    }

            return (
                <div id="error-message">
                    <div id="error-container">
                        <img src={error} alt="error image" />
                        <div>
                            <h1>{errorMessage}</h1>
                            <h2>{code ? code : '404'}</h2>
                            <h3>Out of nothing, something.</h3>
                            <p>You can find (just about) anything on Centre — apparently even a page that doesn’t exist. Maybe these stories about finding what you didn’t know you were looking for will take you somewhere new?</p>
                            <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
            );
}

export default ErrorMessage;