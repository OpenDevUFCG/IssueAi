import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'blueprint-css/dist/blueprint.min.css';

const mountNode = document.getElementById('app');
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    mountNode
);
