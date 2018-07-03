import React from 'react';
import Nav from '../../components/nav/nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList } from '../../redux/actions/index';
import './playlist.css';
import modal from '../../components/modal/modal';

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
        dom.push(<li key={i} onClick={() => {
            props.onClick(i)
        }} className="borderBot">
            <div className="t">{val.name}</div>
            <div className="b">{val.artists}</div>
        </li>);
    });
    return (dom);
}

class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        let list = window.localStorage.getItem('163MusicPlayHistoryList');

        if (list !== null) {
            this.setState({
                list: JSON.parse(list)
            });
        }
    }

    handleClick(i) {
        const {setPlayList, setCurrentPlayId} = this.props;
        if (this.props.playList.length > 0) {
            // 该歌曲已出现在播放列表
            if (this.props.playList.find(val => val.id === this.state.list[i].id) !== undefined) {
                this.setReduxNext(i);
                return;
            }
            setPlayList([this.state.list[i], ...this.props.playList]);
            setCurrentPlayId(this.state.list[i].id);
        } else {
            this.setReduxNext(i);
        }
    }

    setReduxNext(i) {
        const {setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList} = this.props;
        setCurrentPlayId(this.state.list[i].id);
        setPlayList(this.state.list.slice(i, i + 1));
        setPlayListId(new Date().getTime());
        setRefreshPlayList(true);
    }

    handlePlayAll() {
        const {setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList} = this.props;
        setCurrentPlayId(this.state.list[0].id);
        setPlayList(this.state.list);
        setPlayListId(new Date().getTime());
        setRefreshPlayList(true);
    }

    handleRemove() {
        modal({
            message: '确定清空全部播放记录吗？',
            onOk: () => {
                window.localStorage.removeItem('163MusicPlayHistoryList');
                this.setState({
                    list: []
                });
            }
        });
    }

    render() {
        return (
            <div className="warp">
                <Nav />
                <div className="content m-playlist" id="content">
                    <div className="m-item borderBot">
                        <div className="l">
                            <span className="b">最近播放</span>
                            <span className="s">（{this.state.list.length}）</span>
                        </div>
                        {
            this.state.list.length > 0 ?
                <div className="r" onClick={() => this.handlePlayAll()}>播放全部</div>
                : null
            }
                        {
            this.state.list.length > 0 ?
                <div className="r" onClick={() => this.handleRemove()}>清空</div>
                : null
            }
                    </div>
                    <div className="m-history-list">
                        <Item
            list={this.state.list}
            onClick={(i) => this.handleClick(i)}
            />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);