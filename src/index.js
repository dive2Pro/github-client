import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch, Router } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
const App = lazy(() => import ('./App'));
const Callback = lazy(() => import ('./Callback'));
const User = lazy(() => import ('./User'));
const ServerError = lazy(() => import ('./ServerError'));

const Application = () => {
    return <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path={'/'} component={App} />
                <Route path={'/callback'} component={Callback} />
                <Route path={'/user'} component={User} />
            </Switch>
        </Suspense>
    </BrowserRouter>
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
