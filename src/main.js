import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles including Tailwind
import App from './App'; // Main app component
import { Provider } from 'react-redux';
import { store } from './app/store'; // Redux store instance
// Create root React node and render the app wrapped with Redux Provider
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
