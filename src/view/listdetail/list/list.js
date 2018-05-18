import React from 'react';
import Loading from '../../../components/loading/loading';
import { artists } from '../../../common/utils';
import './list.css';

function Item(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        dom.push(<li key={i}>
            <div className="l">{i + 1}</div>
            <div className="r borderBot">
                <p>{val.name}</p>
                <span>{artists(val.artists)}</span>
            </div>
        </li>);
    });
    return (dom);  
}

class List extends React.Component {
    render() {
        // console.log(this.props.data)
        let loading = '';
        if (this.props.data.length === 0) loading = <Loading />;
        return (
            <div className="m-ld-list">
                <div className="m-ld-list_header borderBot">
                    <i className="iconfont icon-icon-3 l"></i>
                    <div className="r">播放全部<span>(共{this.props.data.length}首)</span></div>
                </div>
                <ul className="m-ld-list_list">
                    {loading}
                    <Item data={this.props.data} />
                </ul>
            </div>
        );
    }
}

export default List;
