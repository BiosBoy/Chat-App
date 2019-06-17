import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Message from './Message';
import NewUserConnected from '../NewUserConnected';
import Placeholder from '../LoadingPlaceholder';
import LiveMessageTyping from '../LiveMessageTyping';

import {
  CONNECTED,
  DISCONNECTED
} from '../../constants/connectionStatuses';

const MESSAGE_TITLE = 'Chat Messages';
const USER_TOGGLER_TITLE = 'users';

class MessagesList extends React.PureComponent {
  static propTypes = {
    typingUsers: PropTypes.array,
    connectionStatus: PropTypes.string,
    showUsersList: PropTypes.bool,
    usersListToogle: PropTypes.func,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  static defaultProps = {
    connectionStatus: '',
    showUsersList: true,
    typingUsers: [],
    usersListToogle: () => {}
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

  _handleClick = () => {
    const { usersListToogle } = this.props;

    usersListToogle();
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

  _messageTypes = () => ({
    newUser: message => <NewUserConnected key={message.uuid} {...message} />,
    message: message => <Message key={message.uuid} {...message} />
  })

  _getUsersListToggle = () => {
    const { showUsersList = false } = this.props;

    return (
      <button
        className={`asideButtonToggle${showUsersList ? ' asideButtonToggleActive' : ''}`}
        type='button'
        onClick={this._handleClick}
      >
        {USER_TOGGLER_TITLE}
      </button>
    );
  }

  _getConnectionStatus = () => {
    const { connectionStatus } = this.props;

    const connectionStatusesClasses = classnames({
      connectionStatusIconСonnected: connectionStatus === CONNECTED,
      connectionStatusIconDisconnected: connectionStatus === DISCONNECTED
    });

    return (
      <span className='connectionStatus'>
        <span className='connectionStatusText'>Connection status: </span>
        <i className={`connectionStatusIcon ${connectionStatusesClasses}`} />
      </span>
    );
  }

  _renderTopSection = () => {
    return (
      <React.Fragment>
        <span className='sectionTitle chatTitle'>
          {MESSAGE_TITLE}
        </span>
        {this._getUsersListToggle()}
        {this._getConnectionStatus()}
      </React.Fragment>
    );
  }

  _renderMessages = () => {
    const { messages = [] } = this.props;

    if (!messages || messages.length === 0) {
      return (
        <Placeholder text='Trying to load message list...' width='40px' height='40px' />
      );
    }

    return messages.map(message => {
      const MessageToRender = this._messageTypes()[message.layout] || this._messageTypes().message;

      return MessageToRender(message);
    });
  }

  render() {
    const { typingUsers } = this.props;

    return (
      <section id='message-list'>
        <div className='topSectionMessages'>{this._renderTopSection()}</div>
        <div ref={this.ref} className='messagesList'>{this._renderMessages()}</div>
        <div className='bottomSectionMessages'><LiveMessageTyping typingUsers={typingUsers} /></div>
        <hr className='boxShadowBefore' />
      </section>
    );
  }
}

export default MessagesList;
