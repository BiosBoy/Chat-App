import React from 'react';
import PropTypes from 'prop-types';

const TYPING_LABEL = 'typing';

class LiveMessageTyping extends React.PureComponent {
  static propTypes = {
    typingUsers: PropTypes.array,
    isSomeoneTyping: PropTypes.bool
  }

  static defaultProps = {
    typingUsers: [],
    isSomeoneTyping: false
  }

  _getTypingUsers = () => {
    const { typingUsers } = this.props;

    const typingUsersString = typingUsers.join(', ');

    return typingUsersString;
  }

  _renderTypingText = () => {
    const { typingUsers } = this.props;

    const typingPostfixCounter = typingUsers.length > 1 ? 'are' : 'is';
    const typingUsersString = this._getTypingUsers();

    return `${typingUsersString} ${typingPostfixCounter} ${TYPING_LABEL}`;
  }

  render() {
    const { isSomeoneTyping } = this.props;

    if (!isSomeoneTyping) return null;

    return (
      <div className='liveMessageWrap'>
        <span className='liveMessageText'>
          {`${this._renderTypingText()}`}
        </span>
        <span className='liveDots' />
      </div>
    );
  }
}

export default LiveMessageTyping;
