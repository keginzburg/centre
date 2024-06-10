import { RECEIVE_ARTICLE } from "./articles";
import { receiveClapError } from "./error";
import csrfFetch from "./csrf";

export const RECEIVE_CLAP = "claps/RECEIVE_CLAP";
export const REMOVE_CLAP = "claps/REMOVE_CLAP";

export const receiveClap = payload => {
    return {
        type: RECEIVE_CLAP,
        payload
    }
};

export const removeClap = payload => {
    return {
        type: REMOVE_CLAP,
        payload
    }
};

export const createClap = ({clappableType, clappableId, amount}) => async dispatch => {
    try {
        const response = await csrfFetch("/api/claps", {
            method: "POST",
            body: JSON.stringify({clap: { clappableType, clappableId, amount }})
        });
        const data = await response.json();
        dispatch(receiveClap(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveClapError(data.errors));
        throw err;
    }
}

export const updateClap = (clapId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/claps/${clapId}`, {
            method: "PATCH"
        });
        const data = await response.json();
        dispatch(receiveClap(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveClapError(data.errors));
        throw err;
    }
}

export const deleteClap = (clapId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/claps/${clapId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        dispatch(removeClap(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveClapError(data.errors));
        throw err;
    }
}

const initialState = {};

const clapReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case RECEIVE_ARTICLE:
            return { ...nextState, ...action.payload.claps };
        case RECEIVE_CLAP:
            nextState[action.payload.clap.id] = action.payload.clap;
            return nextState;
        case REMOVE_CLAP:
            delete nextState[action.payload.clap.id];
            return nextState;
        default:
            return state;
    }
}

export default clapReducer;