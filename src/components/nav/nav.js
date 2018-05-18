import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './nav.css';

class Nav extends React.Component {
    render() {
        return (
            <div className="m-nav content-header bgred">
                <div className="l">
                    <i className="iconfont icon-nav"></i>
                </div>
                <div className="c">
                    <NavLink activeClassName="active" to="/playlist"><i className="iconfont icon-icon-"></i></NavLink>
                    <NavLink activeClassName="active" to="/home"><i className="iconfont icon-icon-2"></i></NavLink>
                    <NavLink activeClassName="active" to="/toplist"><i className="iconfont icon-paixingbang"></i></NavLink>
                </div>
                <div className="r">
                    <Link to="/search"><i className="iconfont icon-icon-10"></i></Link>
                </div>
            </div>
        );
    }
}

export default Nav;
