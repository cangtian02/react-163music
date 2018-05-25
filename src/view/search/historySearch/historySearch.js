import React from 'react';
import './historySearch.css';

class HistorySearch extends React.Component {
    render() {
        let dom = [];
        this.props.list.forEach((val, i) => {
            dom.push(<li key={i} className="borderBot">
                <div className="l" onClick={() => { this.props.searchValue(this.props.list[i]) }}>{val}</div>
                <div className="r" onClick={() => { this.props.deleteHistory(i) }}><i className="iconfont icon-quxiao-"></i></div>
            </li>);
        });

        let style = this.props.list.length > 0 ? 'block' : 'none';
        style = {display: style};

        return (
            <div className="m-search-history">
                <div className="m-search-title" style={style}>历史搜索</div>
                <ul>{dom}</ul>
            </div>
        );
    }
}

export default HistorySearch;
