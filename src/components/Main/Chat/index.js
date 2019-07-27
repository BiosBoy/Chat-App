import React from 'react';
import PropTypes from 'prop-types';

import MessagesList from '../Messages/MessagesList';

class Chat extends React.Component {
  static propTypes = {
    chats: PropTypes.object,
    currentUserName: PropTypes.string,
    currentChat: PropTypes.object
  };

  static defaultProps = {
    chats: {},
    currentUserName: '',
    currentChat: {
      chatType: 'rooms',
      chatID: 'global'
    }
  }

  _getCurrentChatMessages = () => {
    const { chats, currentChat: { chatType, chatID } } = this.props;

    const chatToRender = chats[chatType] && chats[chatType].find(channel => {
      // console.log(channel, chatID, 'channel, chatID');

      return channel.ID === chatID || false;
    });

    return chatToRender || [];
  }

  render() {
    const { currentUserName } = this.props;

    const { messages = [] } = this._getCurrentChatMessages();

    return (
      <MessagesList messages={messages} currentUserName={currentUserName} />
    );
  }
}

export default Chat;
