import React from 'react';
import { searchHot, search } from '../../common/api';
import { artists } from '../../common/utils';
import Header from './header/header';
import List from './list/list';
import Hot from './hot/hot';
import HistorySearch from './historySearch/historySearch';
import './search.css';

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            list: [],
            hots: [],
            history: []
        }
    }

    componentDidMount() {
        searchHot().then(res => {
            this.setState({ hots: res.result.hots });
        });

        let history = window.localStorage.getItem('163MusicSearchHistory');
        if (history !== null) {
            this.setState({
                history: JSON.parse(history)
            });
        }
    }

    searchValue(val) {
        search(val).then(res => {
            res = res.result.songs;

            let list = [];
            res.forEach(val => {
                list.push({
                    id: val.id,
                    name: val.name,
                    pic: val.album.picUrl,
                    artists: artists(val.artists)
                });
            });

            let history = [];
            if (this.state.history.find(v => v === val) === undefined) {
                history = [val, ...this.state.history].slice(0, 5);
            } else {
                let arr = this.state.history;
                let i = arr.indexOf(val);
                arr.unshift(arr.splice(i, 1)[0]);
                history = arr;
            }

            this.setState({
                list: list,
                history: history
            });

            window.localStorage.setItem('163MusicSearchHistory', JSON.stringify(history));
        });
    }

    removeList() {
        if (this.state.list.length > 0) {
            this.setState({ list: [] });
        }
    }

    deleteHistory(i) {
        let history = this.state.history;
        history.splice(i, 1);

        this.setState({
            history: history
        });

        window.localStorage.setItem('163MusicSearchHistory', JSON.stringify(history));
    }

    render() {
        return (
            <div className="warp">
                <Header 
                    history={this.props.history} 
                    value={this.state.value} 
                    searchValue={(val) => this.searchValue(val)} 
                    removeList={() => this.removeList()}
                />
                <div className="content m-search">
                    <List list={this.state.list} />
                    <div className="m-search-page">
                        <Hot
                            hots={this.state.hots} 
                            searchValue={(val) => this.searchValue(val)} 
                        />
                        <HistorySearch
                            list={this.state.history} 
                            searchValue={(val) => this.searchValue(val)} 
                            deleteHistory={(i) => this.deleteHistory(i)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
