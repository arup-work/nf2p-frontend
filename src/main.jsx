import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

// import './index.css'
import App from './App.jsx'
import reduxStore from './Redux/Index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
)
