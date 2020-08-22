import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'

import './index.css'
import 'blueprint-css/dist/blueprint.min.css'

const mountNode = document.getElementById('app')

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <App />
  </HashRouter>,
  mountNode
)
