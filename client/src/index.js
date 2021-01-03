import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
