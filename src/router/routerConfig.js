import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/loading/loading';

const LoadingComponents = ({ isLoading, error }) => {
    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <div>啊哦，页面加载错误。。。</div>;
    } else {
        return null;
    }
};

const Home = Loadable({
    loader: () => import('../view/home/home'),
    loading: LoadingComponents
});

const Playlist = Loadable({
    loader: () => import('../view/playlist/playlist'),
    loading: LoadingComponents
});

const PlaylistDetail = Loadable({
    loader: () => import('../view/listdetail/listdetail'),
    loading: LoadingComponents
});

const Toplist = Loadable({
    loader: () => import('../view/toplist/toplist'),
    loading: LoadingComponents
});

const Search = Loadable({
    loader: () => import('../view/search/search'),
    loading: LoadingComponents
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
