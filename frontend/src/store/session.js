import csrfFetch, { storeCSRFToken } from "./csrf";
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "./follow";

export const SET_CURRENT_USER = "session/SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "session/REMOVE_CURRENT_USER";

export const setCurrentUser = payload => {
    return {
        type: SET_CURRENT_USER,
        payload
    };
}

export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
}

export const login = ({ email, password}) => async dispatch => {
    try {
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        dispatch(setCurrentUser(data));
    } catch (err) {
        throw err;
    }
}

export const signup = ({ email, name, password}) => async dispatch => {
    try {
        const response = await csrfFetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email, name, password })
        });
        const data = await response.json();
        dispatch(setCurrentUser(data));
    } catch (err) {
        throw err;
    }
}

export const logout = () => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    dispatch(removeCurrentUser());
    return response;
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    dispatch(setCurrentUser(data));
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case SET_CURRENT_USER:
            if (action.payload.user) {
                action.payload.user.followingIds = new Set(action.payload.user.followingIds)
                action.payload.user.followerIds = new Set(action.payload.user.followerIds)
            }
            nextState.user = action.payload.user;
            return nextState;

        case REMOVE_CURRENT_USER:
            nextState.user = null;
            return nextState;

        case RECEIVE_FOLLOW:
        case REMOVE_FOLLOW:
            action.payload.follower.followingIds = new Set(action.payload.follower.followingIds);
            action.payload.follower.followerIds = new Set(action.payload.follower.followerIds);
            nextState.user = action.payload.follower;
            return nextState;

        default:
            return state;
    }
}

export default sessionReducer;