import React from 'react';
import FastClick from 'fastclick';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { routes, RouteWithSubRoutes } from './router/routerConfig';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/index';
import './assets/reset.css';
import './assets/fonts/iconfont.css';
import Play from './view/play/play';

FastClick.attach(document.body);

const store = createStore(rootReducer);

render((
    <Provider store={store}>
        <Router>
            <div className="app">
                <Play />
                <Route exact path="/" render={() => (<Redirect exact from="/" to="/home" />)} />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </div>
        </Router>
    </Provider>
), document.getElementById('root'));
