import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

const fontsUrl = process.env.REACT_APP_FONTS_URL;

// Define custom font-face styles for the application
// These fonts are here to allow env vars to be used in their URL for CDN deployment
const fontFaceStyles = `
@font-face {
  font-family: 'Lobster Two';
  src: url("${fontsUrl}/LobsterTwo-Italic.ttf") format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

// Dynamically inject the font-face styles into the document's head
const styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.appendChild(document.createTextNode(fontFaceStyles));
document.head.appendChild(styleEl);

const container = document.getElementById('root'); // Get the root element where the app will be rendered
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container); // Create a React root for rendering the app
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Enables routing for the application */}
      <App /> {/* Main application component */}
    </BrowserRouter>
  </React.StrictMode>
);
