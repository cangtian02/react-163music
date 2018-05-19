import React from 'react';
import './viewCtrl.css';

class ViewCtrl extends React.Component {
    render() {
        let playItem = this.props.playItem;
        let orderClass = this.props.order === 0 ? 'icon-icon-9' : this.props.order === 1 ? 'icon-icon-11' : 'icon-icon-8';
        let pausedClass = this.props.paused ? 'icon-icon-7' : 'icon-icon-3';

        return (
            <div className="m-viewCtrl">
                <div className="bg"><img src={playItem.pic} alt={playItem.name} /></div>
                <div className="box">
                    <div className="m-viewCtrl_header">
                        <div className="l">
                            <i className="iconfont icon-xiala-"></i>
                        </div>
                        <div className="r">
                            <p className="ellipsis">{playItem.name}</p>
                            <span>{playItem.artists}</span>
                        </div>
                    </div>
                    <div className="m-viewCtrl_warp">
                    
                    </div>
                    <div className="m-viewCtrl_footer">
                        <div className="l" onClick={() => { this.props.handleOrder() }}>
                            <i className={'iconfont ' + orderClass}></i>
                        </div>
                        <div className="c">
                            <em onClick={() => { this.props.handlePrev() }}><i className="iconfont icon-icon-6"></i></em>
                            <em onClick={() => { this.props.handlePaused() }}><i className={'iconfont ' + pausedClass}></i></em>
                            <em onClick={() => { this.props.handleNext() }}><i className="iconfont icon-icon-4"></i></em>
                        </div>
                        <div className="l">
                            <i className="iconfont icon-icon-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCtrl;
