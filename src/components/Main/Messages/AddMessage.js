import React from 'react';
import PropTypes from 'prop-types';

import generateUUID from '../../../utils/uuid';
import { CONNECTED } from '../../../constants';

const MESSAGE_TYPE = 'message';

class AddMessage extends React.PureComponent {
  static propTypes = {
    dispatchLiveTyping: PropTypes.func.isRequired,
    dispatchMessage: PropTypes.func.isRequired,
    currentChat: PropTypes.object.isRequired,
    currentUser: PropTypes.shape({
      connectionStatus: PropTypes.string,
      uuid: PropTypes.number,
      name: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  _getMessageTimestamp = () => {
    const timestamp = Date.now();

    return timestamp;
  }

  _handleSendMessage = () => {
    const { value } = this.state;
    const {
      currentChat: { chatType, chatID },
      currentUser: { name, uuid: uuidAuthor, connectionStatus }, dispatchMessage
    } = this.props;

    if (!value || value.length === 0 || connectionStatus !== CONNECTED) return;

    dispatchMessage({
      chat: {
        type: chatType,
        ID: chatID
      },
      messageType: MESSAGE_TYPE,
      message: value,
      uuid: generateUUID(),
      uuidAuthor,
      author: name,
      timestamp: this._getMessageTimestamp()
    });

    this._resetStateValue();
  }

  _setStateValue = e => {
    this.setState({
      value: e.target.value
    });
  }

  _resetStateValue = () => {
    this.setState({
      value: ''
    });
  }

  _onKeyPressHandler = e => {
    if (e.key === 'Enter') {
      this._handleSendMessage();
    }
  }

  _onClickHandler = () => {
    this._handleSendMessage();
  }

  _onChangeHandler = e => {
    const { currentChat, currentUser: { name, uuid }, dispatchLiveTyping } = this.props;

    dispatchLiveTyping({ chat: currentChat, author: name, uuid });
    this._setStateValue(e);
  }

  render() {
    const { value } = this.state;

    return (
      <section id='new-message'>
        <input
          onKeyPress={this._onKeyPressHandler}
          onChange={this._onChangeHandler}
          type='text'
          placeholder='Type your message...'
          value={value}
        />
        <button className={`sendMessageButton${value ? ' sendMessageButtonActive' : ''}`} type='button' onClick={this._onClickHandler}>
          <svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width='25px'
            height='25px'
          >
            <path
              d='M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z'
            />
          </svg>
        </button>
      </section>
    );
  }
}

export default AddMessage;
