import React from 'react';
import { filterTime } from '../../../common/utils';
import './viewCtrl.css';

function CtrlHeader(props) {
    return(
        <div className="m-viewCtrl_header">
            <div className="l" onClick={() => { props.onClick() }}>
                <i className="iconfont icon-xiala-"></i>
            </div>
            <div className="r">
                <p className="ellipsis">{props.data.name}</p>
                <span>{props.data.artists}</span>
            </div>
        </div>
    );
}

function CtrlDisc(props) {
    let circlingClass = props.paused ? 'circling' : '';

    return(
        <div className="m-viewCtrl_disc">
            <div className={"pic " + circlingClass}><img src={props.pic} alt={props.pic} /></div>
            <div className={"ani " + circlingClass}></div>
        </div>
    );
}

function CtrlTime(props) {
    // 歌曲缓冲条相关逻辑待下一版本开发
    let line2 = { transform: 'translateX(-100%)' };
    let line3 = { width: ((props.currentTime / props.duration) * 100) + '%' };

    let progressBar;

    function handleLine(e, bar) {
        const distance = e.clientX - bar.offsetLeft;
        const scale = distance / bar.offsetWidth;
        const time = Math.floor(props.duration * scale);
        props.onClick(time);
    }

    return(
        <div className="m-viewCtrl_time">
            <div className="l">{filterTime(props.currentTime)}</div>
            <div className="c" 
                ref={node => {progressBar = node}}
                onClick={(e) => { handleLine(e, progressBar) }}
            >
                <div className="line-box">
                    <div className="line line1"></div>
                    <div className="line line2" style={line2}></div>
                    <div className="line line3" style={line3}></div>
                </div>
            </div>
            <div className="r">{filterTime(props.duration)}</div>
        </div>
    );
}

function CtrlFooter(props) {
    return(
        <div className="m-viewCtrl_footer">
            <div className="l" onClick={() => { props.handleOrder() }}>
                <i className={'iconfont ' + props.orderClass}></i>
            </div>
            <div className="c">
                <em onClick={() => { props.handlePrev() }}><i className="iconfont icon-icon-6"></i></em>
                <em onClick={() => { props.handlePaused() }}><i className={'iconfont ' + props.pausedClass}></i></em>
                <em onClick={() => { props.handleNext() }}><i className="iconfont icon-icon-4"></i></em>
            </div>
            <div className="l">
                <i className="iconfont icon-icon-1"></i>
            </div>
        </div>
    );
}

class ViewCtrl extends React.Component {
    render() {
        let playItem = this.props.playItem;
        let viewClass = this.props.showViewCtrl ? 'm-viewCtrl_show' : 'm-viewCtrl_hide';

        return (
            <div className={'m-viewCtrl ' + viewClass}>
                <div className="bg"><img src={playItem.pic} alt={playItem.name} /></div>
                <div className="box">
                    <CtrlHeader data={playItem} onClick={() => { this.props.handleShowViewCtrl(false) }} />
                    <div className="m-viewCtrl_warp">
                        <CtrlDisc pic={playItem.pic} paused={this.props.paused} />
                    </div>
                    <CtrlTime 
                        currentTime={this.props.currentTime} 
                        duration={this.props.duration} 
                        onClick={(t) => { this.props.handleCurrentTime(t) }}
                    />
                    <CtrlFooter
                        handleOrder={() => { this.props.handleOrder() }} 
                        orderClass={this.props.order === 0 ? 'icon-icon-9' : this.props.order === 1 ? 'icon-icon-11' : 'icon-icon-8'} 
                        pausedClass={this.props.paused ? 'icon-icon-7' : 'icon-icon-3'} 
                        handlePrev={() => { this.props.handlePrev() }} 
                        handlePaused={() => { this.props.handlePaused() }} 
                        handleNext={(t) => { this.props.handleNext(t) }} 
                    />
                </div>
            </div>
        );
    }
}

export default ViewCtrl;
