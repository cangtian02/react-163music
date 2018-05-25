import React from 'react';
import './header.css';
import { throttle } from '../../../common/utils';

class Header extends React.Component {

    constructor() {
        super();
        this.textInput = React.createRef();
    }

    handleChange() {
        let val = this.textInput.current.value.trim();
        if (val === '') {
            this.props.removeList();
            return;
        }

        this.props.searchValue(val);
    }

    render() {
        return (
            <div className="m-search-header content-header bgred">
                <div className="l" onClick={() => { this.props.history.goBack() }}>
                    <i className="iconfont icon-left"></i>
                </div>
                <div className="r">
                    <input 
                        type="text" 
                        autoFocus="autoFocus" 
                        placeholder="输入关键词搜索歌曲" 
                        ref={this.textInput} 
                        onChange={throttle(this.handleChange.bind(this), 500)} 
                    />
                </div>
            </div>
        );
    }
}

export default Header;
