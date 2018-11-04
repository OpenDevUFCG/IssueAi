import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

import 'blueprint-css/dist/blueprint.min.css';

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
