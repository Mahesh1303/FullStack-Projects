import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { NomineeProvider } from './NomineeContext'; // Adjust path as necessary
import App from './App';

ReactDOM.render(
    <Router>
        <NomineeProvider>
            <App />
        </NomineeProvider>
    </Router>,
    document.getElementById('root')
);
