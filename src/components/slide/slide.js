import React from 'react';
import BScroll from 'better-scroll';
import './slide.css';

function SlideContent(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        dom.push(<li key={i}><img src={val} alt={val} /></li>);
    });
    return (dom);
}

function SlideDots(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        dom.push(<li key={i} className={props.currentIndex === i ? 'active' : ''}></li>);
    });
    return (dom);
}

class Slide extends React.Component {

    constructor() {
        super();
        this.state = {
            group_style: { width: 0 },
            len: 0,
            currentPageIndex: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            len: nextProps.data.length
        });
        setTimeout(() => {
            this.setSlideWidth();
            this.initSlide();
        }, 20);
    }

    componentWillUnmount() {
        this.slide && this.slide.destroy();
        clearTimeout(this.timer);
    }

    setSlideWidth() {
        let slideWidth = this.refs.slide.clientWidth;
        let width = (this.state.len + 2) * slideWidth;
        this.setState({
            group_style: {
                width: width
            }
        });
    }

    initSlide() {
        if (this.slide) this.slide.destroy(); this.slide = null;
        if (this.timer) clearTimeout(this.timer);

        this.slide = new BScroll(this.refs.slide, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
                loop: true,
                threshold: 0.3,
                speed: 400
            },
            bounce: false
        });

        this.slide.on('scrollEnd', () => {
            this.setState({
                currentPageIndex: this.slide.getCurrentPage().pageX
            });
            this.play();
        });

        this.slide.on('touchEnd', () => {
            this.play();
        });

        this.slide.on('beforeScrollStart', () => {
            clearTimeout(this.timer);
        });

        this.play();
    }

    play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (this.state.currentPageIndex >= this.state.len) {
                this.setState({
                    currentPageIndex: 0
                });
            }
            this.slide.next();
        }, 3000);
    }

    render() {
        return (
            <div className="m-slide">
                <div className="m-slide-bg bgred"></div>
                <div className="m-slide-warp">
                    <div className="m-slide-content" ref="slide">
                        <div className="m-slide-group" style={this.state.group_style}>
                            <SlideContent data={this.props.data} />
                        </div>
                        <ul className="m-slide-index">
                            <SlideDots data={this.props.data} currentIndex={this.state.currentPageIndex} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slide;
