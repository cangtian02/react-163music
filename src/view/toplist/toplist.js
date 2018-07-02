import React from 'react';
import { Link } from 'react-router-dom';
import { topList } from '../../common/api';
import { artists } from '../../common/utils';
import Nav from '../../components/nav/nav';
import Loading from '../../components/loading/loading';
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
                    pic: '',
                    list: []
                },
                {
                    id: 1,
                    pic: '',
                    list: []
                },
                {
                    id: 2,
                    pic: '',
                    list: []
                },
                {
                    id: 3,
                    pic: '',
                    list: []
                },
                {
                    id: 4,
                    pic: '',
                    list: []
                },
            ],
            toggleView: false,
        }
    }

    componentDidMount() {
        let arr = this.state.list,
            len = 0;
        arr.forEach((val, i) => {
            topList(val.id).then(res => {
                arr[i].pic = res.playlist.coverImgUrl;
                res = res.playlist.tracks;
                res.forEach((v, j) => {
                    arr[i].list.push({
                        name: v.name,
                        artists: artists(v.ar)
                    });
                });
                len++;
                if (len === arr.length) {
                    this.setState({
                        list: arr,
                        toggleView: true,
                    });
                }
            });
        });
    }

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content m-toplist">
                    {this.state.toggleView ? <Item list={this.state.list}/> : <Loading />}
                </div>
            </div>
        );
    }
}

export default Toplist;
