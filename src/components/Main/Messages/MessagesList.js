import React from 'react';
import PropTypes from 'prop-types';

import MessageRegular from './MessageRegular';
import MessageUser from './MessageUser';
import Placeholder from '../../LoadingPlaceholder';

class MessagesList extends React.PureComponent {
  static propTypes = {
    typingUsers: PropTypes.array,
    currentUserName: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  static defaultProps = {
    currentUserName: '',
    typingUsers: []
  }

  // eslint-disable-next-line react/sort-comp
  _messageTypes = {
    user: message => <MessageUser key={message.uuid} {...message} />,
    message: message => <MessageRegular key={message.uuid} {...message} />
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: 0
    };

    this.ref = React.createRef();
  }

  componentDidMount() {
    this._setScrollHeightState();
  }

  componentDidUpdate(nextProps, prevState) {
    if (prevState.scrollHeight !== this.ref.current.scrollHeight) {
      this._setScrollHeightState();
      this._setScrollTop();
    }
  }

  _setScrollHeightState = () => {
    this.setState({
      scrollHeight: this.ref.current.scrollHeight || 0
    });
  }

  _setScrollTop = () => {
    const currentRef = this.ref.current;

    currentRef.scrollTop = currentRef.scrollHeight;
  }

  _getCurrentUserMessages = messages => {
    const { currentUserName } = this.props;

    if (!messages || messages.length === 0) {
      return (
        <Placeholder text='Trying to load message list...' width='40px' height='40px' />
      );
    }

    const normalizedMessages = messages.map(message => {
      const spitedMessage = message.message.split(' ');
      const isCurrentUserMessage = message.layout === 'user' && spitedMessage[0] === currentUserName;

      if (isCurrentUserMessage) {
        // fixing system messages for current user
        spitedMessage[0] = 'You';
        spitedMessage[1] = spitedMessage[1] === 'is' ? 'are' : 'have';
        spitedMessage[2] = spitedMessage[1] === 'have' ? 'leaved' : spitedMessage[2];

        return {
          ...message,
          ...isCurrentUserMessage && { isCurrentUser: isCurrentUserMessage },
          message: spitedMessage.join(' ')
        };
      }

      return message;
    });

    return normalizedMessages;
  }

  _renderMessages = () => {
    const { messages = [] } = this.props;

    if (!messages || messages.length === 0) {
      return (
        <Placeholder text='Trying to load message list...' width='40px' height='40px' />
      );
    }

    const normalizedMessages = this._getCurrentUserMessages(messages);

    return normalizedMessages.map(message => {
      const MessageToRender = this._messageTypes[message.layout] || this._messageTypes.message;

      return MessageToRender(message);
    });
  }

  render() {
    return (
      <div ref={this.ref} className='messagesList'>{this._renderMessages()}</div>
    );
  }
}

export default MessagesList;
