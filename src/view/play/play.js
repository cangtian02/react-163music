import React from 'react';
import { musicUrl, musicLyric } from '../../common/api';
import { getRandom, parseLyric } from '../../common/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayListId, setPlayList, setCurrentPlayId, setRefreshPlayList } from '../../redux/actions/index';
import BotCtrl from './botCtrl/botCtrl';
import ViewCtrl from './viewCtrl/viewCtrl';
import ListCtrl from './listCtrl/listCtrl';
import './play.css';

const mapStateToProps = state => {
    return {
        playListId: state.playListId,
        playList: state.playList,
        currentPlayId: state.currentPlayId,
        refreshPlayList: state.refreshPlayList
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

class Play extends React.Component {

    constructor() {
        super();
        this.state = {
            playListId: 0,  // 歌单id
            paused: true,  // 播放状态 true播放  false暂停
            order: 0,  // 播放顺序 0列表循环 1随机播放 2单曲循环
            showViewCtrl: false,  // 显示播放控制页面
            duration: 0,  // 歌曲时长单位s
            currentTime: 0, // 歌曲当前播放时长单位s
            lyric: '',  // 歌词
            showListCtrl: false,  // 显示播放列表
            deleteIndex: [],  // 播放列表中被删除掉的歌曲下标集合
        }
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.willReceiveProps(nextProps);
        }, 20);
    }

    willReceiveProps(nextProps) {
        if (this.state.playListId === 0) this.createAudio();

        if (this.state.playListId !== nextProps.playListId) {
            this.setState({
                playListId: nextProps.playListId,
                deleteIndex: []
            });
        }

        // 当播放列表刷新时
        if (this.props.refreshPlayList) {
            this.setState({
                deleteIndex: []
            });
            setTimeout(() => {
                const { setRefreshPlayList } = this.props;
                setRefreshPlayList(false);
            }, 20);
        }

        if (this.props.playListId !== -1) {
            this.init();
            setTimeout(() => {
                this.setStateShowViewCtrl(true);
            }, 180);
        }
    }

    createAudio() {
        let audio = document.createElement('audio');
        audio.id = 'm-audio';
        document.body.appendChild(audio);
    }

    audio() {
        return document.getElementById('m-audio');
    }

    init() {
        musicUrl(this.props.currentPlayId).then(res => {
            if (res.data[0].url === undefined) return;

            this.audio().src = res.data[0].url;
            this.audioInit();
            this.getMusicLyric();
        });
    }

    // 获取歌词
    getMusicLyric() {
        musicLyric(this.props.currentPlayId).then(res => {
            if (res.lrc === undefined || res.lrc.lyric === undefined) return;

            this.setState({
                lyric: parseLyric(res.lrc.lyric)
            });
        });
    }

    audioInit() {
        // 设置播放状态为暂停
        this.setStatePaused(false);

        // 当音乐可以播放时
        this.audio().addEventListener('canplay', () => {
            this.audioCanplay();
        }, false);

        // 当歌曲时长变化时
        this.audio().addEventListener('durationchange', () => {
            this.setState({
                duration: this.audio().duration
            });
        }, false);

        // 当音乐加载错误时
        this.audio().addEventListener('error', () => {
            alert('歌曲加载错误');
        }, false);

        // 当音乐暂停时
        this.audio().addEventListener('pause', () => {
            this.audioPaused(0);
        }, false);

        // 当音乐播放时
        this.audio().addEventListener('play', () => {
            this.audioPaused(1);
        }, false);

        // 当音乐停止时
        this.audio().addEventListener('ended', () => {
            this.audioSwitch(0);
        }, false);
    }

    // 歌曲可以播放后处理相关
    audioCanplay() {
        this.audio().play();
        this.setStatePaused(true);
        this.setState({ 
            currentTime: this.audio().currentTime,
            duration: this.audio().duration
        });
    }

    /**
     * 监控歌曲播放状态
     * @param {number} f 0暂停 1播放
     */
    audioPaused(f) {
        clearInterval(this.currentTimer);
        if (f === 1) {
            this.currentTimer = null;
            this.currentTimer = setInterval(() => {
                this.setState({
                    currentTime: this.state.currentTime + 1
                });
            }, 1000);
        }
    }

    /**
     * 歌曲切换
     * @param {number} f 0 歌曲播放完毕 1上一曲 2下一曲 
     */
    audioSwitch(f) {
        // 切换前先暂停播放条的定时器
        clearInterval(this.currentTimer);

        const { setCurrentPlayId } = this.props;

        // 列表循环
        if (this.state.order === 0) {
            let i = f === 1 ? this.getSwitchIndex(0, this.getPlayIndex()) : this.getSwitchIndex(1, this.getPlayIndex());
            setCurrentPlayId(this.props.playList[i].id);
        }

        // 随机播放
        if (this.state.order === 1) {
            let i = getRandom(this.getPlayIndex(), this.props.playList.length);
            setCurrentPlayId(this.props.playList[i].id);
        }

        // 单曲循环
        if (this.state.order === 2) {
            if (f === 0) {
                this.audio().currentTime = 0;
                this.audio().play();
            } else {
                let i = f === 1 ? this.getSwitchIndex(0, this.getPlayIndex()) : this.getSwitchIndex(1, this.getPlayIndex());
                setCurrentPlayId(this.props.playList[i].id);
            }
        }
    }

    /**
     * 获取将要切换歌曲在列表中下标
     * 如果计算的i出现在deleteIndex中，就将i作为当前下标递归再次计算
     * @param {number} f 0上一曲 1下一曲 
     * @param {number} c 当前下标
     */
    getSwitchIndex(f, c) {
        let len = this.props.playList.length - 1;
        let i = f === 0 ? c === 0 ? len : c - 1 : c === len ? 0 : c + 1;

        if (this.state.deleteIndex.find((v) => v === i) !== undefined) {
            return this.getSwitchIndex(f, i);
        } else {
            return i;
        }
    }

    // 获取当前播放歌曲在播放列表中的下标
    getPlayIndex() {
        for (let i = 0, len = this.props.playList.length;i < len;i++) {
            if (this.props.playList[i].id === this.props.currentPlayId) return i;
        }
    }

    // 设置音乐播放与暂停
    handlePaused() {
        !this.audio().paused ? this.audio().pause() : this.audio().play();
        this.setStatePaused(!this.audio().paused);
    }

    // 设置播放顺序
    handleOrder() {
        let order = this.state.order === 0 ? 1 : this.state.order === 1 ? 2 : 0;
        this.setState({ order: order });
    }

    /**
     * 设置播放位置
     * @param {number} t 播放位置单位s 
     */
    handleCurrentTime(t) {
        this.audio().currentTime = t;
        this.setState({
            currentTime: t
        });
    }

    // 设置播放状态  播放or暂停
    setStatePaused(f) {
        this.setState({ paused: f });
    }

    // 设置是否显示控制页面
    setStateShowViewCtrl(f) {
        this.setState({ showViewCtrl: f });
    }

    // 设置是否显示播放列表
    setStateShowListCtrl(f) {
        this.setState({ showListCtrl: f });
    }

    // 清空播放列表
    handleRemovePlayList() {
        // 清空重置数据
        const { setPlayListId, setPlayList, setCurrentPlayId } = this.props;
        setPlayListId(-1);
        setPlayList([]);
        setCurrentPlayId(0);
        setTimeout(() => {
            this.setState({ playListId: 0 });
            this.setStateShowViewCtrl(false);
            this.setStateShowListCtrl(false);
        }, 20);
        this.setState({ deleteIndex: [] });

        // 停止播放清除audio标签
        this.audio().pause();
        this.audio().remove();
    }

    // 切换播放固定位置音乐
    handleSwitchPlay(i) {
        if (this.props.playList[i].id === this.props.currentPlayId) return;

        const { setCurrentPlayId } = this.props;
        setCurrentPlayId(this.props.playList[i].id);
    }

    /**
     * 删除播放列表的某一项
     * @param {number} i 将要删除掉的下标 
     */
    handleDeleteList(i) {
        if (this.deleteIndex.length === this.props.playList.length - 1) {
            this.handleRemovePlayList();
        } else {
            this.setState({ deleteIndex: [...this.state.deleteIndex, i] });

            if (this.props.playList[i].id === this.props.currentPlayId) {  // 当前正在播放的歌曲
                this.audioSwitch(2);
            }
        }
    }

    render() {
        if (this.props.playList.length === 0) {
            return (<div></div>);
        } else {
            let playList = this.props.playList;
            let playItem = playList.find(val => { return val.id === this.props.currentPlayId });
            return (
                <div className="m-playCtrl">
                    <BotCtrl 
                        playItem={playItem} 
                        paused={this.state.paused} 
                        handlePaused={() => { this.handlePaused() }} 
                        handleShowViewCtrl={() => { this.setStateShowViewCtrl(true) }}
                        handleShowListCtrl={() => { this.setStateShowListCtrl(true) }} 
                    />
                    <ViewCtrl 
                        playItem={playItem} 
                        paused={this.state.paused} 
                        handlePaused={() => { this.handlePaused() }} 
                        order={this.state.order} 
                        handleOrder={() => { this.handleOrder() }}
                        handlePrev={() => { this.audioSwitch(1) }} 
                        handleNext={() => { this.audioSwitch(2) }} 
                        showViewCtrl={this.state.showViewCtrl} 
                        handleShowViewCtrl={() => { this.setStateShowViewCtrl(false) }} 
                        duration={this.state.duration} 
                        currentTime={this.state.currentTime} 
                        handleCurrentTime={(t) => {this.handleCurrentTime(t) }} 
                        lyric={this.state.lyric} 
                        handleShowListCtrl={() => { this.setStateShowListCtrl(true) }} 
                    />
                    <ListCtrl
                        data={this.props.playList} 
                        deleteIndex={this.state.deleteIndex} 
                        currentPlayId={this.props.currentPlayId}  
                        showListCtrl={this.state.showListCtrl} 
                        handleShowListCtrl={() => { this.setStateShowListCtrl(false) } } 
                        handleRemovePlayList={() => { this.handleRemovePlayList() }} 
                        handleSwitchPlay={(i) => { this.handleSwitchPlay(i) }} 
                        handleDeleteList={(i) => { this.handleDeleteList(i) }}
                    />
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
