import csrfFetch, { storeCSRFToken } from "./csrf";

export const SET_CURRENT_USER = "session/SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "session/REMOVE_CURRENT_USER";

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
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
        dispatch(setCurrentUser(data.user));
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
        dispatch(setCurrentUser(data.user));
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
    dispatch(setCurrentUser(data.user));
    return response;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case SET_CURRENT_USER:
            nextState.user = action.user;
            return nextState;
        case REMOVE_CURRENT_USER:
            nextState.user = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;