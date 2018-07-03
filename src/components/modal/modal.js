import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './modal.css';

let el = null;

class Modal extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			classStr: '',
		}

		this.hideTime = 550;
    }

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				classStr: 'm-modal-show',
			});
		}, 20);
	}

	handleOk(props) {
		props.onOk();
		this.close();
	}

	handleCancel(props) {
		props.onCancel();
		this.close();
	}

	close() {
		this.setState({
			isOpen: false,
			classStr: 'm-modal-hide',
		}, () => {
			setTimeout(() => {
				document.body.removeChild(el);
				el = null;
			}, this.hideTime);
		});
	}

    render() {
		const {title, message, okText, cancelText} = this.props;

		return ReactDOM.createPortal(
			<div className={"m-modal " + this.state.classStr}>
				<div className="m-modal-mask"></div>
				<div className="m-modal-body">
					<div className="m-modal-title">{title}</div>
					<div className="m-modal-message">{message}</div>
					<div className="m-modal-footer">
						<div className="m-modal-btn" onClick={() => this.handleCancel(this.props)}>{cancelText}</div>
						<div className="m-modal-btn" onClick={() => this.handleOk(this.props)}>{okText}</div>
					</div>
				</div>
			</div>,
			el
		);
    }
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onCancel: PropTypes.func,
	onOk: PropTypes.func,
	okText: PropTypes.string,
	cancelText: PropTypes.string
};

Modal.defaultProps = {
	isOpen: true,
	title: '',
	message: 'message',
	onCancel: () => {},
	onOk: () => {},
	okText: '确定',
	cancelText: '取消'
};

const show = (props) => {
	el = document.createElement('div');
	document.body.appendChild(el);
    ReactDOM.render(
		React.createElement(Modal, {...props}),
		el
	);
}

export default props => show(props);