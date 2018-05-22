import React from 'react';
import Loading from '../../../components/loading/loading';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayListId, setPlayList, setCurrentPlayIndex, setCurrentPlayId } from '../../../redux/actions/index';
import './list.css';

const mapStateToProps = state => {
    return { 
        currentPlayIndex: state.currentPlayIndex,
        currentPlayId: state.currentPlayId
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setPlayListId,
        setPlayList,
        setCurrentPlayIndex,
        setCurrentPlayId
    }, dispatch);
}

function Item(props) {
    let dom = [];
    props.list.forEach((val, i) => {
        dom.push(<li key={i} onClick={() => { props.onClick(i) }} className={props.currentPlayId === val.id ? 'active': ''}>
            <div className="l">
                {props.currentPlayId === val.id ? <i className="iconfont icon-icon-5"></i> : i + 1}
            </div>
            <div className="r borderBot">
                <p className="ellipsis">{val.name}</p>
                <span>{val.artists}</span>
            </div>
        </li>);
    });
    return (dom);
}

class List extends React.Component {

    handleClick(i) {
        const { setPlayListId, setPlayList, setCurrentPlayIndex, setCurrentPlayId } = this.props;
        setPlayListId(this.props.playListId);
        setPlayList(this.props.list);
        setCurrentPlayIndex(i);
        setCurrentPlayId(this.props.list[i].id);
    }

    render() {
        let loading = '';
        if (this.props.list.length === 0) loading = <Loading />;
        return (
            <div className="m-ld-list">
                <div className="m-ld-list_header borderBot" onClick={() => this.handleClick(0)}>
                    <i className="iconfont icon-icon-3 l"></i>
                    <div className="r">播放全部<span>(共{this.props.list.length}首)</span></div>
                </div>
                <ul className="m-ld-list_list">
                    {loading}
                    <Item list={this.props.list} currentPlayId={this.props.currentPlayId} onClick={(i) => { this.handleClick(i)}} />
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
