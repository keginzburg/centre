import csrfFetch from "./csrf";

import { receiveFollowError } from "./error";
import { SET_CURRENT_USER } from "./session";
import { RECEIVE_USER } from "./user";

export const RECEIVE_FOLLOW = "follows/RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";

export const receiveFollow = payload => {
    return {
        type: RECEIVE_FOLLOW,
        payload
    }
};

export const removeFollow = payload => {
    return {
        type: REMOVE_FOLLOW,
        payload
    }
};

export const createFollow = ({followerId, userId}) => async dispatch => {
    try {
        const response = await csrfFetch("/api/follows", {
            method: "POST",
            body: JSON.stringify({follow: { followerId, userId }})
        });
        const data = await response.json();
        dispatch(receiveFollow(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveFollowError(data.errors));
        throw err;
    }
}

export const deleteFollow = (followId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/follows/${followId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        dispatch(removeFollow(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveFollowError(data.errors));
        throw err;
    }
}

const initialState = {};

const followReducer = (state = initialState, action) => {
    Object.freeze(state);

    let nextState = { ...state };

    switch (action.type) {
        case RECEIVE_FOLLOW:
            nextState[action.payload.follow.id] = action.payload.follow;
            return nextState;
        case REMOVE_FOLLOW:
            delete nextState[action.payload.follow.id];
            return nextState;
        case SET_CURRENT_USER:
            return { ...nextState, ...action.payload.follows };
        case RECEIVE_USER:
            return { ...nextState, ...action.payload.follows };
        default:
            return state;
    }
}

export default followReducer;