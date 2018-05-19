import React from 'react';
import './small.css';

export function Title(props) {
    return (
        <div className="m-title">
            <span>{props.title}</span>&nbsp;<i className="iconfont icon-right"></i>
        </div>
    );
}

export function PlayCount(props) {
    let num = props.num;
    num = isNaN(num) ? 0 : num >= 100000000 ? (num / 100000000).toFixed(2) + '亿' : num >= 100000 ? Math.floor(num / 10000).toFixed(0) + '万' : num.toFixed(0);
    return (
        <div className="m-playCount">
            <i className="iconfont icon-erji"></i>&nbsp;<span>{num}</span>
        </div>
    );
}
