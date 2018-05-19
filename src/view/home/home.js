import React from 'react';
import { banner, personalized } from '../../common/api';
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
        this.getPersonalized();
    }

    getBanner() {
        banner().then(res => {
            let arr = [];
            res.banners.forEach(val => {
                arr.push(val.picUrl);
            });
            this.setState({
                banner: arr
            });
        });
    }

    getPersonalized() {
        personalized().then(res => {
            this.setState({
                personalized: res.result
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content m-home" id="content">
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
