import React from 'react';
import './list.css';
import { songDetail } from '../../../common/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList } from '../../../redux/actions/index';

const mapStateToProps = state => {
    return {
        playList: state.playList,
        currentPlayId: state.currentPlayId,
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
        dom.push(<li key={i} onClick={() => { props.onClick(i) }} className="borderBot">
            <div className="t">{val.name}</div>
            <div className="b">{val.artists}</div>
        </li>);
    });
    return (dom);
}

class List extends React.Component {

    handleClick(i) {
        // 判断歌曲的图片是否加载成功
        let img = new Image();
        img.src = this.props.list[i].pic;

        img.onload = () => {
            this.setRedux(i);
        }

        img.onerror = () => {
            songDetail(this.props.list[i].id).then(res => {
                this.props.list[i].pic = res.songs[0].al.picUrl;
                this.setRedux(i);
            });
        }
    }

    setRedux(i) {
        const { setPlayList, setCurrentPlayId } = this.props;
        if (this.props.playList.length > 0) {
            // 该歌曲已出现在播放列表
            if (this.props.playList.find(val => val.id === this.props.list[i].id) !== undefined) {
                this.setReduxNext(i);
                return;
            }
            setPlayList([this.props.list[i], ...this.props.playList]);
            setCurrentPlayId(this.props.list[i].id);
        } else {
            this.setReduxNext(i);
        }
    }

    setReduxNext(i) {
        const { setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList } = this.props;
        setCurrentPlayId(this.props.list[i].id);
        setPlayList(this.props.list.slice(i, i + 1));
        setPlayListId(new Date().getTime());
        setRefreshPlayList(true);
    }

    render() {
        return (
            <div className="m-search-list">
                <Item
                    list={this.props.list}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
