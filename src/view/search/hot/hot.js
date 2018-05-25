import React from 'react';
import './hot.css';

class Hot extends React.Component {
    render() {
        let dom = [];
        this.props.hots.forEach((val, i) => {
            dom.push(<li key={i} onClick={() => { this.props.searchValue(this.props.hots[i].first) }}>
                <div className="t">{val.first}</div>
            </li>);
        });

        return (
            <div className="m-search-hot">
                <div className="m-search-title">热门搜索</div>
                <ul>{dom}</ul>
            </div>
        );
    }
}

export default Hot;
