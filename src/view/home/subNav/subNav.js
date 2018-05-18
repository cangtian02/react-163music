import React from 'react';
import { Link } from 'react-router-dom';
import './subNav.css';

class SubNav extends React.Component {
    render() {
        return (
            <div className="m-subnav borderBot">
                <Link to="/playlist"><i className="icon_1"></i>私人FM</Link>
                <Link to="/playlist"><i className="icon_2"></i>每日推荐</Link>
                <Link to="/playlist"><i className="icon_3"></i>歌单</Link>
                <Link to="/toplist"><i className="icon_4"></i>排行榜</Link>
            </div>
        );
    }
}

export default SubNav;
