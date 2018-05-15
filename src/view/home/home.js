import React from 'react';
import fetch from '../../common/fetch';
import Nav from '../../components/navBar/nav';
import Slide from '../../components/slide/slide';
import SubNav from './subNav/subNav';
import Title from '../../components/title/title';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            banner: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getBanner();
            this.getPlayList();
        }, 20);
    }

    getBanner() {
        fetch('banner').then(res => {
            if (res.code !== 200) return alert('banner api error');
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
            if (res.code !== 200) return alert('banner api error');
            console.log(res)
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
                </div>
            </div>
        );
    }
}

export default Home;
