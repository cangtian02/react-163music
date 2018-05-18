import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="m-ld-header content-header bgred">
                <div className="l" onClick={() => { this.props.history.goBack() }}>
                    <i className="iconfont icon-left"></i>
                </div>
                <div className="c">推荐歌单</div>
                <div className="r">
                    <Link to="/search"><i className="iconfont icon-icon-10"></i></Link>
                </div>
            </div>
        );
    }
}

export default Header;
