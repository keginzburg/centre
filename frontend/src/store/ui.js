export const SET_MODAL = "ui/SET_MODAL";
export const REMOVE_MODAL = "ui/REMOVE_MODAL";
export const CLEAR_MODALS = "ui/CLEAR_MODALS";
export const CLEAR_ARTICLE_IDS = "ui/CLEAR_ARTICLE_IDS";

import { SET_CURRENT_USER } from "./session";
import { RECEIVE_ARTICLES, REMOVE_ARTICLE } from "./articles";

export const setModal = modal => {
    return {
        type: SET_MODAL,
        modal
    };
}

export const removeModal = modal => {
    return {
        type: REMOVE_MODAL,
        modal
    };
}

export const clearModals = () => {
    return {
        type: CLEAR_MODALS
    };
}

export const clearArticleIds = () => {
    return {
        type: CLEAR_ARTICLE_IDS
    };
}

const initialState = {
    modal: null,
    articleIds: []
};

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = {...state};

    switch (action.type) {
        case RECEIVE_ARTICLES:
            nextState.articleIds = action.payload.articleIds;
            return nextState;
        case CLEAR_ARTICLE_IDS:
            nextState.articleIds = [];
            return nextState;
        case SET_MODAL:
            nextState.modal = action.modal;
            return nextState;
        case CLEAR_MODALS:
            return { modal: null };
        case SET_CURRENT_USER:
            return { modal: null };
        case REMOVE_ARTICLE:
            return { modal: null };
        default:
            return state;
    }
}

export default uiReducer;