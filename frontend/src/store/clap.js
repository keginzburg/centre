import { RECEIVE_ARTICLE } from "./articles";
import csrfFetch from "./csrf";

export const RECEIVE_CLAP = "claps/RECEIVE_CLAP";

export const receiveClap = payload => {
    return {
        type: RECEIVE_CLAP,
        payload
    }
}

export const createClap = ({clappableType, clappableId, amount}) => async dispatch => {
    // debugger
    try {
        const response = await csrfFetch("/api/claps", {
            method: "POST",
            body: JSON.stringify({clap: { clappableType, clappableId, amount }})
        });;
        const data = await response.json();
        // debugger
        dispatch(receiveClap(data));
    } catch (err) {
        throw err;
    }
}

export const updateClap = (clapId) => async dispatch => {
    // debugger
    try {
        const response = await csrfFetch(`/api/claps/${clapId}`, {
            method: "PATCH"
        });;
        const data = await response.json();
        // debugger
        dispatch(receiveClap(data));
    } catch (err) {
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
        default:
            return state;
    }
}

export default clapReducer;