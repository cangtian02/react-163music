import React from 'react';
import './botCtrl.css';

class BotCtrl extends React.Component {
    render() {
        let playItem = this.props.playItem;
        let pausedClass = this.props.paused ? 'icon-icon-7' : 'icon-icon-3';
        return (
            <div className="m-botCtrl">
                <div className="l" onClick={() => { this.props.handleShowViewCtrl(true) }}>
                    <img src={playItem.pic} alt={playItem.pic} />
                    <div className="i">
                        <p className="ellipsis">{playItem.name}</p>
                        <span>{playItem.artists}</span>
                    </div>
                </div>
                <div className="r">
                    <em onClick={() => { this.props.handlePaused() }}><i className={'iconfont ' + pausedClass}></i></em>
                    <em><i className="iconfont icon-icon-1"></i></em>
                </div>
            </div>
        );
    }
}

export default BotCtrl;
