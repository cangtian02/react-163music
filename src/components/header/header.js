import React from 'react';
import './header.css';

class GHeader extends React.Component {
    render() {
        return (
            <div className="content-header g-header bgred">
                <div className="g-header-l" onClick={() => { this.props.history.goBack() }}>
                    <i className="iconfont icon-left"></i>
                </div>
                <div className="g-header-r">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default GHeader;
