import React from 'react';
import Loading from '../loading/loading';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList } from '../../redux/actions/index';
import './musicList.css';

const mapStateToProps = state => {
    return {
        reduxPlayListId: state.playListId,
        currentPlayId: state.currentPlayId
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setPlayListId,
        setPlayList,
        setCurrentPlayId,
        setRefreshPlayList
    }, dispatch);
}

function Item(props) {
    let dom = [];
    props.list.forEach((val, i) => {
        dom.push(<li key={i} onClick={() => {
            props.onClick(i)
        }} className={props.currentPlayId === val.id ? 'active' : ''}>
            <div className="l">
                {props.currentPlayId === val.id ? <i className="iconfont icon-icon-5"></i> : i + 1}
            </div>
            <div className="r borderBot">
                <p>{val.name}</p>
                <span>{val.artists}</span>
            </div>
        </li>);
    });
    return (dom);
}

class List extends React.Component {

    handleClick(i) {
        if (this.props.list.length === 0) return;
        if (this.props.playListId === this.props.reduxPlayListId && this.props.list[i].id === this.props.currentPlayId) return;

        const {setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList} = this.props;
        setCurrentPlayId(this.props.list[i].id);
        setPlayList(this.props.list);
        setPlayListId(this.props.playListId);
        setRefreshPlayList(true);
    }

    render() {
        let loading = '';
        if (this.props.list.length === 0)
            loading = <Loading />;

        return (
            <div className="m-music-list" style={this.props.style}>
                <div className="m-music-list_header borderBot" onClick={() => this.handleClick(0)}>
                    <i className="iconfont icon-icon-3 l"></i>
                    <div className="r">播放全部<span>(共{this.props.list.length}首)</span></div>
                </div>
                <ul className="m-music-list_list">
                    {loading}
                    <Item
            list={this.props.list}
            currentPlayId={this.props.currentPlayId}
            onClick={(i) => this.handleClick(i)}
            />
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
