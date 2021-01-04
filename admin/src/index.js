import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
