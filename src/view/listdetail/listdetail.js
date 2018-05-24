import React from 'react';
import { artists } from '../../common/utils';
import { playlistDetail } from '../../common/api';
import Header from './header/header';
import Detail from './detail/detail';
import List from './list/list';
import './listdetail.css';

class ListDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            datail: '',
            list: [],
            playListId: 0
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail() {
        playlistDetail(this.props.match.params.id).then(res => {
            res = res.result;

            let datail = {
                name: res.name,
                pic: res.coverImgUrl,
                playCount: res.playCount,
                creator_name: res.creator.nickname,
                creator_pic: res.creator.backgroundUrl,
                tags: res.tags.join('/')
            };
            
            let list = [];
            res.tracks.forEach(val => {
                list.push({
                    id: val.id,
                    name: val.name,
                    pic: val.album.picUrl,
                    artists: artists(val.artists)
                });
            });

            this.setState({
                playListId: res.id,
                datail: datail,
                list: list
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Header history={this.props.history} />
                <div className="content m-ld">
                    <div className="m-ld_bg"><img src={this.state.datail.pic} alt={this.state.datail.name} /></div>
                    <Detail datail={this.state.datail} />
                    <List list={this.state.list} playListId={this.state.playListId} />
                </div>
            </div>
        );
    }
}

export default ListDetail;
