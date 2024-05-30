import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import ThemeProvider from "./components/ThemeProvider";
import Modal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById('root'));

Modal.setAppElement("#root");

root.render(
    <Provider store={store}>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Provider>
);

reportWebVitals();
