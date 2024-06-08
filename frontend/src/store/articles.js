import { RECEIVE_CLAP } from "./clap";
import csrfFetch from "./csrf";

export const RECEIVE_ARTICLES = "articles/RECEIVE_ARTICLES";
export const RECEIVE_ARTICLE = "articles/RECEIVE_ARTICLE";
export const REMOVE_ARTICLE = "articles/REMOVE_ARTICLE";

import { REMOVE_CURRENT_USER } from "./session";

export const receiveArticles = payload => {
    return {
        type: RECEIVE_ARTICLES,
        payload
    };
}

export const receiveArticle = payload => {
    return {
        type: RECEIVE_ARTICLE,
        payload
    };
}

export const removeArticle = payload => {
    return {
        type: REMOVE_ARTICLE,
        payload
    };
}

export const fetchArticles = options => async dispatch => {
    try {
        let response;
        switch (options) {
            case 'trending':
                response = await csrfFetch("/api/articles?limit=6");
                break;
            case 'index':
                response = await csrfFetch("/api/articles");
                break;
        }
        const data = await response.json();
        dispatch(receiveArticles(data));
    } catch (err) {
        throw err;
    }
}

export const fetchArticle = articleId => async dispatch => {
    try {
        const response = await csrfFetch(`/api/articles/${articleId}`);
        const data = await response.json();
        dispatch(receiveArticle(data));
    } catch (err) {
        throw err;
    }
}

export const postArticle = formData => async dispatch => {
    try {
        const response = await csrfFetch(`/api/articles`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json();
        dispatch(receiveArticle(data));
        return data;
    } catch (err) {
        throw err;
    }
}

export const patchArticle = formData => async dispatch => {
    // debugger
    try {
        const response = await csrfFetch(`/api/articles/${formData.get('article[id]')}`, {
            method: 'PATCH',
            body: formData
        })
        const data = await response.json();
        dispatch(receiveArticle(data));
        return data;
    } catch (err) {
        throw err;
    }
}

export const deleteArticle = articleId => async dispatch => {
    try {
        const response = await csrfFetch(`/api/articles/${articleId}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        await dispatch(removeArticle(data));
        return data;
    } catch (err) {
        throw err;
    }
}

const initialState = {};

const articlesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case RECEIVE_ARTICLES:
            return { ...nextState, ...action.payload.articles };
        case RECEIVE_ARTICLE:
            nextState[action.payload.article.id] = action.payload.article;
            return nextState;
        case REMOVE_ARTICLE:
            delete nextState[action.payload.article.id];
            return nextState;
        case RECEIVE_CLAP:
            nextState[action.payload.article.id] = action.payload.article;
            return nextState;
        default:
            return state;
    }
}

export default articlesReducer;