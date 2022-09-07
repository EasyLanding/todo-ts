import React from 'react';
import ReactDOM from 'react-dom/client';
import "./components/index.css"
import App from './components/App/App'


const container = document.getElementById('body') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(< App />)