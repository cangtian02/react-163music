import React from 'react';
import fetch from '../../common/fetch';
import Header from './header/header';
import Detail from './detail/detail';
import List from './list/list';
import './listdetail.css';

class ListDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            datail: '',
            list: []
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail() {
        fetch('playlist/detail?id=' + this.props.match.params.id).then(res => {
            res = res.result;
            // console.log(res);
            this.setState({
                datail: {
                    name: res.name,
                    pic: res.coverImgUrl,
                    playCount: res.playCount,
                    creator_name: res.creator.nickname,
                    creator_pic: res.creator.backgroundUrl,
                    tags: res.tags.join('/')
                },
                list: res.tracks
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
                    <List data={this.state.list} />
                </div>
            </div>
        );
    }
}

export default ListDetail;
