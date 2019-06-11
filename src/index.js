import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RedBox from 'redbox-react';
import store from './store';

import App from './App';

const MOUNT_NODE = document.getElementById('root');

// ========================================================
// Render Setup
// ========================================================
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    MOUNT_NODE
  );
};

const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  window.store = store;
  // ========================================================
  // DEVELOPMENT STAGE! HOT MODULE REPLACE ACTIVATION!
  // ========================================================
  const devRender = () => {
    if (module.hot) {
      module.hot.accept('./App', () => render());
    }

    render();
  };

  // Wrap render in try/catch
  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  // ========================================================
  // PRODUCTION GO!
  // ========================================================
  render();
}
