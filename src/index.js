import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'
import './assets/styles/main.scss';
import { RootCmp } from './root-cmp'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <RootCmp />
    </Router>
);

