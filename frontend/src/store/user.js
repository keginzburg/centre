import csrfFetch from "./csrf";
import { RECEIVE_ARTICLES, RECEIVE_ARTICLE } from "./articles";
import { RECEIVE_CLAP, REMOVE_CLAP } from "./clap";
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "./follow";
import { receiveProfileError } from "./error";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = payload => {
    return {
        type: RECEIVE_USER,
        payload
    }
};

export const fetchUser = userId => async dispatch => {
    try {
        const response = await csrfFetch(`/api/users/${userId}`);
        const data = await response.json();
        dispatch(receiveUser(data));
    } catch (err) {
        const data = await err.json();
        dispatch(receiveProfileError(data));
        throw err;
    }
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};

    switch (action.type) {
        case RECEIVE_USER:
            action.payload.user.followingIds = new Set(action.payload.user.followingIds);
            action.payload.user.followerIds = new Set(action.payload.user.followerIds);

            nextState[action.payload.user.id] = action.payload.user;
            return { ...nextState, ...action.payload.followers, ...action.payload.following};
        case RECEIVE_ARTICLES:
            return {...nextState, ...action.payload.authors };
        case RECEIVE_ARTICLE:
            nextState[action.payload.author.id] = action.payload.author;
            return { ...nextState, ...action.payload.clappers };
        case RECEIVE_CLAP:
        case REMOVE_CLAP:
            nextState[action.payload.clapper.id] = action.payload.clapper;
            return nextState;
        case RECEIVE_FOLLOW:
        case REMOVE_FOLLOW:
            action.payload.follower.followingIds = new Set(action.payload.follower.followingIds);
            action.payload.follower.followerIds = new Set(action.payload.follower.followerIds);
            action.payload.leader.followingIds = new Set(action.payload.leader.followingIds);
            action.payload.leader.followerIds = new Set(action.payload.leader.followerIds);

            nextState[action.payload.follower.id] = action.payload.follower;
            nextState[action.payload.leader.id] = action.payload.leader;
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;