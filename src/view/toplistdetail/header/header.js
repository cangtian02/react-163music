import React from 'react';
import GHeader from '../../../components/header/header';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <GHeader history={this.props.history}>
                <div className="m-tld-header">
                    <div className="l">排行榜</div>
                    <div className="r">
                        <Link to="/search"><i className="iconfont icon-icon-10"></i></Link>
                    </div>
                </div>
            </GHeader>
        );
    }
}

export default Header;
