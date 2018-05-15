import React from 'react';
import './title.css';

class Title extends React.Component {
    render() {
        return (
            <div className="m-title">
                <span>{this.props.title}</span>&nbsp; 
                <i className="iconfont icon-right"></i>
            </div>
        );
    }
}

export default Title;
