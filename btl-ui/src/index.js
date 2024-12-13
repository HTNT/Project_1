
/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/global-styles/global-style';
import { store } from './store';

/************************************************************************/
/*   Check environment for StrictMode                                   */
/************************************************************************/
const env = process.env.NODE_ENV || 'development';
const root = ReactDOM.createRoot(document.getElementById('root'));

if (env && env === 'production') {
  root.render(
    <React.StrictMode>
        <Provider store={store}>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </Provider>
    </React.StrictMode>
  );
} else {
  root.render(
      <Provider store={store}>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Provider>

  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/************************************************************************/
/*   Hide log in console with environment as production                 */
/************************************************************************/
if (!env || env === 'production') {
  console.log = () => {
    return null;
  };
}
