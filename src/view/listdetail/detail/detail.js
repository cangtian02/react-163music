import React from 'react';
import './detail.css';
import { PlayCount } from '../../../components/small/small';

class Detail extends React.Component {
    render() {
        let datail = this.props.datail;
        return (
            <div className="m-ld-detail">
                <div className="l">
                    <img src={datail.pic} alt={datail.name} />
                    <PlayCount num={datail.playCount} />
                </div>
                <div className="r">
                    <div className="t">{datail.name}</div>
                    <div className="m">
                        <img src={datail.creator_pic} alt={datail.creator_name} />
                        <span>{datail.creator_name}</span>
                    </div>
                    <div className="b">{datail.tags}</div>
                </div>
            </div>
        );
    }
}

export default Detail;
