import React from 'react';
import { Link } from 'react-router-dom';
import { topList } from '../../common/api';
import { artists } from '../../common/utils';
import Nav from '../../components/nav/nav';
import './toplist.css';

function Item(props) {
    let arr = [];
    props.list.forEach((val, i) => {
        arr[i] = [];
        val.list.forEach((v, j) => {
            if (j < 3) arr[i].push(<ol key={j} className="ellipsis">{j + 1}.{v.name}-{v.artists}</ol>);
        });
    });
    
    let dom = [];
    props.list.forEach((val, i) => {
        let link = '/toplistdetail/' + val.id;
        dom.push(<li key={i}>
            <Link to={link}>
                <div className="l">
                    <img src={val.pic} alt={val.pic} />
                </div>
                <div className="r borderBot">
                    {arr[i]}
                </div>
            </Link>
        </li>);
    });
    return (dom);
}

class Toplist extends React.Component {

    constructor() {
        super();
        this.state = {
            list: [
                {
                    id: 0,
                    pic: require('../../assets/img/top_list_1.jpg'),
                    list: []
                },
                {
                    id: 1,
                    pic: require('../../assets/img/top_list_2.jpg'),
                    list: []
                },
                {
                    id: 2,
                    pic: require('../../assets/img/top_list_3.jpg'),
                    list: []
                },
                {
                    id: 3,
                    pic: require('../../assets/img/top_list_4.jpg'),
                    list: []
                },
                {
                    id: 4,
                    pic: require('../../assets/img/top_list_5.jpg'),
                    list: []
                },
            ]
        }
    }

    componentDidMount() {
        let arr = this.state.list;
        arr.forEach((val, i) => {
            topList(val.id).then(res => {
                res = res.playlist.tracks;
                res.forEach((v, j) => {
                    arr[i].list.push({
                        name: v.name,
                        artists: artists(v.ar)
                    });
                });
                this.setState({ list: arr });
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content m-toplist">
                    <Item list={this.state.list}/>
                </div>
            </div>
        );
    }
}

export default Toplist;
