import React from 'react';
import fetch from '../../common/fetch';
import Nav from '../../components/navBar/nav';
import Slide from '../../components/slide/slide';

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

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content home">
                    <Slide data={this.state.banner} />
                </div>
            </div>
        );
    }
}

export default Home;
