import React from 'react';
import { musicUrl, musicLyric } from '../../common/api';
import { getRandom, parseLyric } from '../../common/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentPlayIndex, setPlayListId, setPlayList, setCurrentPlayId } from '../../redux/actions/index';
import BotCtrl from './botCtrl/botCtrl';
import ViewCtrl from './viewCtrl/viewCtrl';
import ListCtrl from './listCtrl/listCtrl';
import './play.css';

const mapStateToProps = state => {
    return {
        playListId: state.playListId,
        playList: state.playList,
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
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.playListId === 0) this.createAudio();
        
        if (this.state.playListId !== nextProps.playListId) {
            this.setState({
                playListId: nextProps.playListId
            });
            setTimeout(() => {
                this.setStateShowViewCtrl(true);
            }, 100);
        }
        
        setTimeout(() => {
            if (this.props.playListId !== -1) this.init();
        }, 20);
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
        musicUrl(this.props.playList[this.props.currentPlayIndex].id).then(res => {
            this.audio().src = res.data[0].url;
            this.audioInit();
            this.getMusicLyric();
        });
    }

    // 获取歌词
    getMusicLyric() {
        musicLyric(this.props.playList[this.props.currentPlayIndex].id).then(res => {
            this.setState({
                lyric: parseLyric(res.lrc.lyric)
            });
        });
    }

    audioInit() {
        this.setStatePaused(false);

        // 当音乐可以播放时
        this.audio().addEventListener('canplay', () => {
            this.audioCanplay();
        }, false);

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

        const { setCurrentPlayIndex, setCurrentPlayId } = this.props;

        // 列表循环
        if (this.state.order === 0) {
            let i = f === 1 ? this.getIndex(0) : this.getIndex(1);
            setCurrentPlayIndex(i);
            setCurrentPlayId(this.props.playList[i].id);
        }

        // 随机播放
        if (this.state.order === 1) {
            let i = getRandom(this.props.currentPlayIndex, this.props.playList.length);
            setCurrentPlayIndex(i);
            setCurrentPlayId(this.props.playList[i].id);
        }

        // 单曲循环
        if (this.state.order === 2) {
            if (f === 0) {
                this.audio().currentTime = 0;
                this.audio().play();
            } else {
                let i = f === 1 ? this.getIndex(0) : this.getIndex(1);
                setCurrentPlayIndex(i);
                setCurrentPlayId(this.props.playList[i].id);
            }
        }
    }

    /**
     * 获取下标
     * @param {number} f 0上一曲 1下一曲 
     */
    getIndex(f) {
        let [cur, len] = [this.props.currentPlayIndex, this.props.playList.length - 1];
        return f === 0 ? cur === 0 ? len : cur - 1 : cur === len ? 0 : cur + 1;
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
        const { setCurrentPlayIndex, setPlayListId, setPlayList, setCurrentPlayId } = this.props;
        setCurrentPlayIndex(-1);
        setPlayListId(-1);
        setPlayList([]);
        setCurrentPlayId(0);
        setTimeout(() => {
            this.setState({ playListId: 0 });
            this.setStateShowViewCtrl(false);
            this.setStateShowListCtrl(false);
        }, 20);

        // 停止播放清除audio标签
        this.audio().pause();
        this.audio().remove();
    }

    // 切换播放固定位置音乐
    handleSwitchCurrentPlayIndex(i) {
        if (i === this.props.currentPlayIndex) return;
        const { setCurrentPlayIndex, setCurrentPlayId } = this.props;
        setCurrentPlayIndex(i);
        setCurrentPlayId(this.props.playList[i].id);
    }

    // 删除播放列表的某一项,此处只删除当前组件内props数据，不删除redux中的
    handleDeleteList(i) {
        if (this.props.playList[i].id === this.props.currentPlayId) {
            this.props.playList.splice(i, 1);
            this.audioSwitch(2);
        } else {
            this.props.playList.splice(i, 1);
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
                        currentPlayIndex={this.props.currentPlayIndex} 
                        currentPlayId={this.props.currentPlayId}  
                        showListCtrl={this.state.showListCtrl} 
                        handleShowListCtrl={() => { this.setStateShowListCtrl(false) } } 
                        handleRemovePlayList={() => { this.handleRemovePlayList() }} 
                        handleSwitchCurrentPlayIndex={(i) => { this.handleSwitchCurrentPlayIndex(i) }} 
                        handleDeleteList={(i) => { this.handleDeleteList(i) }}
                    />
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
