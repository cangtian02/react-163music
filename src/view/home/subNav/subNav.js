import React from 'react';
import './subNav.css';

class SubNav extends React.Component {
    render() {
        return (
            <div className="m-home-subnav borderBot">
                <li><i className="icon_1"></i>私人FM</li>
                <li><i className="icon_2"></i>每日推荐</li>
                <li><i className="icon_3"></i>歌单</li>
                <li><i className="icon_4"></i>排行榜</li>
            </div>
        );
    }
}

export default SubNav;
