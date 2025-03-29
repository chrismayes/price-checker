import React from 'react';
import ReactDOM from 'react-dom/client'; // note the /client import
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9CAF88',
      contrastText: '#FFFFFF',   // #9a88ae
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
