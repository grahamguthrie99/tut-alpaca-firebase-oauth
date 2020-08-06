import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseProvider } from './config/Firebase/FirebaseContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './session/AuthContext';

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </FirebaseProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
