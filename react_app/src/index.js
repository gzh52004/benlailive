import React from 'react'
import { render } from 'react-dom'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import App from './App'
import {Provider} from "./store/store"
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;
render(
    <Provider>
    <Router>
        <App />
    </Router>
    </Provider>,
    document.querySelector('#app')
)