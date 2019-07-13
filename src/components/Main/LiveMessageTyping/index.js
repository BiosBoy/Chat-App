import React from 'react';
import PropTypes from 'prop-types';

const TYPING_LABEL = 'typing';

class LiveMessageTyping extends React.PureComponent {
  static propTypes = {
    currentChat: PropTypes.object,
    typingUsers: PropTypes.array,
    isSomeoneTyping: PropTypes.bool
  }

  static defaultProps = {
    currentChat: {},
    typingUsers: [],
    isSomeoneTyping: false
  }

  _findCurrentChatTypingUsers = () => {
    const { currentChat = {}, typingUsers = [] } = this.props;

    const chatTypingUsers = [];

    typingUsers.forEach(typingUser => {
      if (typingUser.chat.chatID === currentChat.chatID && typingUser.chat.chatType === currentChat.chatType) {
        chatTypingUsers.push(typingUser);
      }
    });

    return chatTypingUsers;
  }

  _getTypingUsers = chatTypingUsers => {
    let typingUsersNames = '';

    chatTypingUsers.forEach((user, index) => {
      typingUsersNames += (index === chatTypingUsers.length - 1) ? user.name : `${user.name}, `;
    });

    return typingUsersNames;
  }

  _renderTypingText = chatTypingUsers => {
    const { typingUsers } = this.props;

    const typingPostfixCounter = typingUsers.length > 1 ? 'are' : 'is';
    const typingUsersString = this._getTypingUsers(chatTypingUsers);

    return `${typingUsersString} ${typingPostfixCounter} ${TYPING_LABEL}`;
  }

  render() {
    const chatTypingUsers = this._findCurrentChatTypingUsers();

    if (chatTypingUsers.length === 0) return null;

    return (
      <div className='liveMessageWrap'>
        <span className='liveMessageText'>
          {`${this._renderTypingText(chatTypingUsers)}`}
        </span>
        <span className='liveDots' />
      </div>
    );
  }
}

export default LiveMessageTyping;
