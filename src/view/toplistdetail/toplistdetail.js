import React from 'react';
import Header from './header/header';
import List from '../../components/musicList/musicList';
import { topList } from '../../common/api';
import { artists } from '../../common/utils';
import './toplistdetail.css';

class Toplistdetail extends React.Component {

    constructor() {
        super();
        this.state = {
            detail: '',
            list: []
        }
    }

    componentDidMount() {
        topList(this.props.match.params.id).then(res => {
            let list = [];
            res.playlist.tracks.forEach(val => {
                list.push({
                    id: val.id,
                    name: val.name,
                    pic: val.al.picUrl,
                    artists: artists(val.ar)
                });
            });

            this.setState({
                detail: res.playlist,
                list: list
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Header history={this.props.history} />
                <div className="content m-tld">
                    <div className="m-tld_bg"><img src={this.state.detail.coverImgUrl} alt={this.state.detail.name} /></div>
                    <List list={this.state.list} playListId={this.state.detail.id} style={{
                marginTop: '8.5rem'
            }} />
                </div>
            </div>
        );
    }
}

export default Toplistdetail;
