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
    num = num >= 100000000 ? (num / 100000000).toFixed(2) + '亿' : num >= 100000 ? Math.floor(num / 10000) + '万' : num;
    return (
        <div className="m-playCount">
            <i className="iconfont icon-erji"></i>&nbsp;<span>{num}</span>
        </div>
    );
}
