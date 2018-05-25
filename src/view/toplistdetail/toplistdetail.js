import React from 'react';
import Header from './header/header';

class Toplistdetail extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="warp">
                <div className="content m-tld">
                    <Header history={this.props.history} />
                </div>
            </div>
        );
    }
}

export default Toplistdetail;
