import React from 'react';
import { Link } from 'react-router-dom';
import './list.css';
import { PlayCount } from '../../../components/small/small';

function Item(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        let link = '/listdetail/' + val.id;
        dom.push(<li key={i}>
            <Link to={link}>
                <img src={val.picUrl} alt={val.name} />
                <PlayCount num={val.playCount} />
                <p className="clamp2">{val.name}</p>
            </Link>
        </li>);
    });
    return (dom);
}

class List extends React.Component {
    render() {
        return(
            <div className="m-list">
                <Item data={this.props.data} />
            </div>
        );
    }
}

export default List;
