import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/demoDataSeeder'; // Import for window functions

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
