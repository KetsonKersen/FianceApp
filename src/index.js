import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom"
import Router from "./routes/Routes"
import { app } from './services/firebaseConfig';
import { GlobalProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <BrowserRouter>
    <Router/>
  </BrowserRouter>
  
);
