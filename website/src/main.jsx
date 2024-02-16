import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './services/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './services/redux/persistor'


import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

import App from './App';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
  </React.StrictMode>,
)
