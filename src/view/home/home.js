import React from 'react';
import fetch from '../../common/fetch';
import Nav from '../../components/nav/nav';
import Slide from '../../components/slide/slide';
import SubNav from './subNav/subNav';
import { Title } from '../../components/small/small';
import List from './list/list';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            banner: [],
            personalized: []
        }
    }

    componentDidMount() {
        this.getBanner();
        this.getPlayList();
    }

    getBanner() {
        fetch('banner').then(res => {
            let arr = [];
            res.banners.forEach(val => {
                arr.push(val.picUrl);
            });
            this.setState({
                banner: arr
            });
        });
    }

    getPlayList() {
        fetch('personalized').then(res => {
            this.setState({
                personalized: res.result
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content home">
                    <Slide data={this.state.banner} />
                    <SubNav />
                    <Title title='推荐歌单' />
                    <List data={this.state.personalized} />
                </div>
            </div>
        );
    }
}

export default Home;
