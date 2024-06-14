import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import sessionReducer from './session';
import uiReducer from './ui';
import errorReducer from './error';
import usersReducer from './user';
import articlesReducer from './articles';
import clapReducer from './clap';
import followReducer from './follow';

const entitiesReducer = combineReducers({
    users: usersReducer,
    articles: articlesReducer,
    claps: clapReducer,
    follows: followReducer
});

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    error: errorReducer,
    ui: uiReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;