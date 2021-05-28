import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Unit extends React.PureComponent {
  static propTypes = {
    isCurrentUser: PropTypes.bool,
    currentUser: PropTypes.object,
    chats: PropTypes.object,
    createNewDirectChat: PropTypes.func,
    chatSelected: PropTypes.func,
    type: PropTypes.string.isRequired,
    currentChat: PropTypes.object,
    unreadedMessages: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        unreadedCount: PropTypes.number
      })
    ),
    configuration: PropTypes.shape({
      ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      uuid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isConnected: PropTypes.bool.isRequired
    }).isRequired,
    unreadedMessagesRead: PropTypes.func
  }

  static defaultProps = {
    currentChat: {},
    isCurrentUser: false,
    currentUser: {},
    chats: [],
    unreadedMessages: [],
    createNewDirectChat: () => {},
    chatSelected: () => {},
    unreadedMessagesRead: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      coordsStart: null
    };
  }

  _createDirectChatID = () => {
    const { currentUser, configuration } = this.props;

    return `${currentUser.uuid + configuration.uuid}`;
  }

  _directChat = (config, chatID) => {
    const { currentUser, createNewDirectChat, chats } = this.props;

    const directChatID = this._createDirectChatID();

    config.currentUserID = currentUser.uuid;
    config.chatID = directChatID;
    config.allowedUsers = [currentUser.uuid, chatID];

    const chatIsNotBeingCreted = !chats.direct.some(channel => channel.ID === directChatID);

    if (chatIsNotBeingCreted) {
      createNewDirectChat(config);
    }
  }

  _selectChat = e => {
    const { configuration, chatSelected, type } = this.props;
    const { dataset: { id: chatID, title } } = e.currentTarget;

    const config = {
      chatType: type,
      title,
      chatID: (configuration.ID).toString(),
      uuid: configuration.uuid,
      userID: chatID
    };

    if (type === 'direct') {
      this._directChat(config, Number(chatID));
    }

    chatSelected(config);
  }

  _handleDown = e => {
    e.persist();

    this.setState(prevState => ({
      ...prevState,
      coordsStart: {
        X: e.clientX,
        Y: e.clientY
      }
    }));
  }

  _handleUp = e => {
    const { coordsStart } = this.state;
    const coordsFinish = {
      X: e.clientX,
      Y: e.clientY
    };

    const isCoordsSame = JSON.stringify(coordsStart) === JSON.stringify(coordsFinish);

    if (!isCoordsSame) return;

    this._selectChat(e);
  }

  _unreadedMessagesFlag = () => {
    const { unreadedMessages, configuration: { ID: currentChatID }, type } = this.props;

    if (!currentChatID || !unreadedMessages || unreadedMessages.length <= 0) {
      return null;
    }

    const isChatHasUnreadedMessages = unreadedMessages.find(unreadedChat => {
      if (type === 'rooms') {
        return String(unreadedChat.ID) === String(currentChatID);
      }
      return String(unreadedChat.ID) === String(this._createDirectChatID());
    });

    if (!isChatHasUnreadedMessages || isChatHasUnreadedMessages.length === 0) {
      return null;
    }

    return (
      <span className='unrededMessageWrap'>
        {isChatHasUnreadedMessages.unreadedCount}
      </span>
    );
  }

  render() {
    const { currentChat, configuration: { name, uuid, isConnected }, isCurrentUser } = this.props;

    const classNames = classnames({
      authorContainer: true,
      authorDisconnected: !isConnected,
      chatSelected: name === currentChat.title
    });

    return (
      <button
        type='button'
        key={uuid}
        data-id={uuid}
        data-title={name}
        onMouseDown={this._handleDown}
        onMouseUp={this._handleUp}
        className={classNames}
      >
        <span className='authorAvatar authorWrap'>
          <svg width='100%' height='100%' data-jdenticon-value={name} />
        </span>
        <span className='authorName sidebarAuthorName'>{isCurrentUser ? `${name} (you)` : name}</span>
        {this._unreadedMessagesFlag()}
      </button>
    );
  }
}

export default Unit;
