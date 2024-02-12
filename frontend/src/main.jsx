import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './App';
import './index.css';

import csrfFetch, {restoreCSRF} from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

restoreCSRF().then(ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
));
