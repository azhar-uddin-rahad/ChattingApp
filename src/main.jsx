import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import firebaseConfig from './firebase/firebase.config.js';
import './index.css'
import { store } from './../store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
