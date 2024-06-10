export const CLEAR_ERRORS = "error/CLEAR_ERRORS";
export const CLAP_ERROR = "error/CLAP_ERROR";

import { RECEIVE_CLAP } from "./clap";

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const receiveClapError = error => {
    return {
        type: CLAP_ERROR,
        error
    }
}

const initialState = {
    article: null,
    clap: null,
    comment: null,
    follow: null
};

const errorReducer = (state = initialState, action) => {
    Object.freeze(state);

    let nextState = { ...state };

    switch (action.type) {
        case CLEAR_ERRORS:
            return {article: null,clap: null,comment: null,follow: null};
        case CLAP_ERROR:
            nextState.clap = action.error;
            return nextState;
        case RECEIVE_CLAP:
            nextState.clap = null;
            return nextState;
        default:
            return state;
    }
}

export default errorReducer;