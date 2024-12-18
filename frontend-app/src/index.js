import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const SGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #40424b;
    letter-spacing: .5px; 
    * {
      box-sizing: border-box;
    }
  }
  .scroll-disabled {
    overflow-y: hidden;
  }
  ::-webkit-scrollbar:vertical {
    width: .5rem;
    height: .5rem;
  }
  ::-webkit-scrollbar {
    width: .65rem;
    height: .65rem;
  }
  ::-webkit-scrollbar-track:vertical {
    background: rgba(9,30,66,.12);
    border-radius: .3rem;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,.15);
    border-radius: .3rem;
  }
  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(9,30,66,.18);
    border-radius: .3rem;
  }
   ::-webkit-scrollbar-thumb {
    background: rgba(223, 225, 230, .5);
    border-radius: .3rem;
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    font-weight: normal;
  }
  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: #172b4d;
    text-decoration: none;
    &:hover {
      color: #091e42;
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <SGlobalStyle />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
