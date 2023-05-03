import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:3000";

axios.defaults.withCredentials=true;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);