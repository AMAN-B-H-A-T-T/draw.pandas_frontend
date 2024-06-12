import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './redux/Store.js'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={Store}>
    <App />
    </Provider>
  </BrowserRouter>  
)
