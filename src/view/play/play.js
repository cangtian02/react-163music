import React from 'react';
import { musicUrl } from '../../common/api';
import { getRandom } from '../../common/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentPlayIndex } from '../../redux/actions/index';
import BotCtrl from './botCtrl/botCtrl';
import ViewCtrl from './viewCtrl/viewCtrl';
import './play.css';

const mapStateToProps = state => {
    return {
        playListId: state.playListId,
        playList: state.playList,
        currentPlayIndex: state.currentPlayIndex
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setCurrentPlayIndex
    }, dispatch);
}

class Play extends React.Component {

    constructor() {
        super();
        this.state = {
            playListId: 0,  // 歌单id
            paused: true,  // 播放状态 true播放  false暂停
            order: 0,  // 播放顺序 0列表循环 1随机播放 2单曲循环
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)

        if (this.state.playListId === 0) this.createAudio();
        
        if (this.state.playListId !== nextProps.playListId) {
            this.setState({
                playListId: nextProps.playListId
            });
        }
        
        setTimeout(() => {
            this.init();
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
            // console.log(res);
            this.audio().src = res.data[0].url;
            this.audioInit();
        });
    }

    audioInit() {
        this.setStatePaused(false);

        this.audio().addEventListener('canplay', () => {
            this.audio().play();
            this.setStatePaused(true);
        }, false);

        this.audio().addEventListener('error', () => {
            alert('歌曲加载错误');
        }, false);

        this.audio().addEventListener('ended', () => {
            this.audioSwitch(0);
        }, false);
    }

    /**
     * 歌曲切换
     * @param {number} f 0 歌曲播放完毕 1上一曲 2下一曲 
     */
    audioSwitch(f) {
        const { setCurrentPlayIndex } = this.props;

        // 列表循环
        if (this.state.order === 0) {
            let i = f === 1 ? this.getIndex(0) : this.getIndex(1);
            setCurrentPlayIndex(i);
        }

        // 随机播放
        if (this.state.order === 1) {
            let i = getRandom(this.props.currentPlayIndex, this.props.playList.length);
            setCurrentPlayIndex(i);
        }

        // 单曲循环
        if (this.state.order === 2) {
            if (f === 0) {
                this.audio().currentTime = 0;
                this.audio().play();
            } else {
                let i = f === 1 ? this.getIndex(0) : this.getIndex(1);
                setCurrentPlayIndex(i);
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

    // 设置播放状态  播放or暂停
    setStatePaused(f) {
        this.setState({ paused: f });
    }

    render() {
        // console.log(this.props);
        if (this.props.playList.length === 0) {
            return (<div></div>);
        } else {
            let playList = this.props.playList;
            let playItem = playList[this.props.currentPlayIndex];
            return (
                <div className="m-playCtrl">
                    <BotCtrl 
                        playItem={playItem} 
                        paused={this.state.paused} 
                        handlePaused={() => { this.handlePaused()}} 
                    />
                    <ViewCtrl 
                        playItem={playItem} 
                        paused={this.state.paused} 
                        handlePaused={() => { this.handlePaused() }} 
                        order={this.state.order} 
                        handleOrder={() => { this.handleOrder() }}
                        handlePrev={() => { this.audioSwitch(1) }} 
                        handleNext={() => { this.audioSwitch(2) }}
                    />
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
