import React from 'react';
import Lazyload from 'vanilla-lazyload';
import { Link } from 'react-router-dom';
import './list.css';
import { PlayCount } from '../../../components/small/small';
import img from '../../../assets/img/lazyload.png';

function Item(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        let link = '/listdetail/' + val.id;
        dom.push(<li key={i}>
            <Link to={link}>
                <div className="b">
                    <img src={img} data-src={val.picUrl} alt={val.name} />
                    <PlayCount num={val.playCount} />
                </div>
                <p className="clamp2">{val.name}</p>
            </Link>
        </li>);
    });
    return (dom);
}

class List extends React.Component {

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            new Lazyload({
                container: document.getElementById('content')
            });
        }, 20);
    }

    render() {
        return(
            <div className="m-home-list">
                <Item data={this.props.data} />
            </div>
        );
    }
}

export default List;
