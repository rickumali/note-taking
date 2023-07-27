import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let notesJson = "[]";
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  notesJson = localStorage.getItem("notes") || "[]";
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App notesFromStorage={notesJson} />
  </React.StrictMode>
);
