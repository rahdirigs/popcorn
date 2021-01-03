import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
