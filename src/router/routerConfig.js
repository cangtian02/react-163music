import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/loadingComponent/loadingComponent';

const Home = Loadable({
    loader: () => import('../view/home/home'),
    loading: LoadingComponent
});

const Playlist = Loadable({
    loader: () => import('../view/playlist/playlist'),
    loading: LoadingComponent
});

const Toplist = Loadable({
    loader: () => import('../view/toplist/toplist'),
    loading: LoadingComponent
});

const Search = Loadable({
    loader: () => import('../view/search/search'),
    loading: LoadingComponent
});

export const routes = [
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/toplist',
        component: Toplist
    },
    {
        path: '/playlist',
        component: Playlist
    },
    {
        path: '/search',
        component: Search
    },
];

export const RouteWithSubRoutes = route => (
    <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes} />
    )} />
);
