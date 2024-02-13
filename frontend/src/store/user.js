import { RECEIVE_ARTICLES, RECEIVE_ARTICLE } from "./articles";

const initialState = {};

const usersReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};

    switch (action.type) {
        case RECEIVE_ARTICLES:
            return {...nextState, ...action.payload.authors };
        case RECEIVE_ARTICLE:
            nextState[action.payload.author.id] = action.payload.author;
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;