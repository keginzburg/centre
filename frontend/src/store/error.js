export const CLEAR_ERRORS = "error/CLEAR_ERRORS";
export const CLAP_ERROR = "error/CLAP_ERROR";
export const FOLLOW_ERROR = "error/FOLLOW_ERROR";
export const PROFILE_ERROR = "error/PROFILE_ERROR";

import { RECEIVE_CLAP, REMOVE_CLAP } from "./clap";
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "./follow";
import { RECEIVE_USER } from "./user";

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
};

export const receiveFollowError = error => {
    return {
        type: FOLLOW_ERROR,
        error
    }
};

export const receiveProfileError = error => {
    return {
        type: PROFILE_ERROR,
        error
    }
};

const initialState = {
    article: null,
    clap: null,
    comment: null,
    follow: null,
    profile: null
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
        case FOLLOW_ERROR:
            nextState.follow = action.error;
            return nextState;
        case PROFILE_ERROR:
            nextState.profile = action.error;
            return nextState;
        case RECEIVE_USER:
            nextState.profile = null;
            return nextState;
        case RECEIVE_FOLLOW:
        case REMOVE_FOLLOW:
            nextState.follow = null;
            return nextState;
        case RECEIVE_CLAP:
        case REMOVE_CLAP:
            nextState.clap = null;
            return nextState;
        default:
            return state;
    }
}

export default errorReducer;