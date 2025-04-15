import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

const fontsUrl = process.env.REACT_APP_FONTS_URL;

const fontFaceStyles = `
@font-face {
  font-family: 'Lobster Two';
  src: url("${fontsUrl}/LobsterTwo-Italic.ttf") format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

const styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.appendChild(document.createTextNode(fontFaceStyles));
document.head.appendChild(styleEl);

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
