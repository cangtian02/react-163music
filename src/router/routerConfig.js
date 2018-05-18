import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/loading/loading';

const Home = Loadable({
    loader: () => import('../view/home/home'),
    loading: Loading
});

const Playlist = Loadable({
    loader: () => import('../view/playlist/playlist'),
    loading: Loading
});

const PlaylistDetail = Loadable({
    loader: () => import('../view/listdetail/listdetail'),
    loading: Loading
});

const Toplist = Loadable({
    loader: () => import('../view/toplist/toplist'),
    loading: Loading
});

const Search = Loadable({
    loader: () => import('../view/search/search'),
    loading: Loading
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
        path: '/listdetail/:id',
        component: PlaylistDetail
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
