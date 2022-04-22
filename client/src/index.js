import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { ContextProvider } from './SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

