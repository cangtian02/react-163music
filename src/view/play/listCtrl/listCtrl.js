import React from 'react';
import './listCtrl.css';

function Item(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        let c = props.currentPlayId === val.id ? 'active' : props.deleteIndex.find((v) => v === i) !== undefined ? 'hide' : '';
        dom.push(<li key={i} className={'borderBot ' + c}>
            <div className="l" onClick={() => { props.handleSwitchPlay(i) }}>{val.name}<span> - {val.artists}</span></div>
            <div className="r" onClick={() => { props.handleDeleteList(i) }}><i className="iconfont icon-quxiao-"></i></div>
        </li>);
    });
    return(dom);
}

class ListCtrl extends React.Component {
    render() {
        let viewClass = this.props.showListCtrl ? 'm-listCtrl_show' : 'm-listCtrl_hide';

        return(
            <div className={'m-listCtrl ' + viewClass}>
                <div className="m-listCtrl_bg" onClick={() => { this.props.handleShowListCtrl() }}></div>
                <div className="m-listCtrl_box">
                    <div className="t borderBot">
                        <p>播放列表<span>(共{this.props.data.length - this.props.deleteIndex.length}首)</span></p>
                        <div className="r" onClick={() => { this.props.handleRemovePlayList() }}><i className="iconfont icon-shanchu"></i></div>
                    </div>
                    <ul>
                        <Item
                            data={this.props.data} 
                            deleteIndex={this.props.deleteIndex} 
                            currentPlayId={this.props.currentPlayId}  
                            handleSwitchPlay={(i) => { this.props.handleSwitchPlay(i) }}
                            handleDeleteList={(i) => { this.props.handleDeleteList(i) }}
                        />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ListCtrl;
