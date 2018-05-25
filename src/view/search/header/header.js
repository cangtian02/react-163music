import React from 'react';
import GHeader from '../../../components/header/header';
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
            <GHeader history={this.props.history}>
                <div className="m-search-header">
                    <input
                        type="text"
                        autoFocus="autoFocus"
                        placeholder="输入关键词搜索歌曲"
                        ref={this.textInput}
                        onChange={throttle(this.handleChange.bind(this), 500)}
                    />
                </div>
            </GHeader>
        );
    }
}

export default Header;
