import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#9CAF88',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#999',
    },
  },
  typography: {
    allVariants: {
      color: '#707070',
    },
  },
});

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
