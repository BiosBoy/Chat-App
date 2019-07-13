import React from 'react';
import PropTypes from 'prop-types';

class Unit extends React.PureComponent {
  static defaultProps = {
    currentChat: {},
    isCurrentUser: false,
    currentUser: {},
    chats: [],
    createNewDirectChat: () => {},
    chatSelected: () => {}
  }

  static propTypes = {
    isCurrentUser: PropTypes.bool,
    currentUser: PropTypes.object,
    chats: PropTypes.object,
    createNewDirectChat: PropTypes.func,
    chatSelected: PropTypes.func,
    type: PropTypes.string.isRequired,
    currentChat: PropTypes.object,
    configuration: PropTypes.shape({
      uuid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isConnected: PropTypes.bool.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      coordsStart: null
    };
  }

  _directChat = (config, chatID) => {
    const { currentUser, createNewDirectChat, type, chats } = this.props;

    if (type === 'direct') {
      const directChatID = `${currentUser.uuid + chatID}`;

      config.currentUserID = currentUser.uuid;
      config.chatID = directChatID;
      config.allowedUsers = [currentUser.uuid, chatID];

      const chatIsNotBeingCreted = !chats.direct.some(channel => channel.ID === directChatID);

      if (chatIsNotBeingCreted) {
        createNewDirectChat(config);
      }
    }
  }

  _selectChat = (coordsFinish, e) => {
    const { coordsStart } = this.state;
    const isCoordsSame = JSON.stringify(coordsStart) === JSON.stringify(coordsFinish);

    if (!isCoordsSame) return;

    const { configuration, chatSelected, type } = this.props;
    const { dataset: { id: chatID, title } } = e.currentTarget;

    const config = {
      chatType: type,
      title,
      chatID: configuration.ID,
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
    const coordsFinish = {
      X: e.clientX,
      Y: e.clientY
    };

    this._selectChat(coordsFinish, e);
  }

  render() {
    const { currentChat, configuration: { name, ID, uuid, isConnected }, isCurrentUser } = this.props;

    // console.log(ID, currentChat.chatID, 'uuid');

    return (
      <button
        type='button'
        key={uuid}
        data-id={uuid}
        data-title={name}
        onMouseDown={this._handleDown}
        onMouseUp={this._handleUp}
        className={`authorContainer${!isConnected ? ' authorDisconnected' : ''}${ID === currentChat.chatID ? ' chatSelected' : ''}`}
      >
        <span className='authorAvatar authorWrap'>
          <svg width='100%' height='100%' data-jdenticon-value={name} />
        </span>
        <span className='authorName sidebarAuthorName'>{isCurrentUser ? `${name} (you)` : name}</span>
      </button>
    );
  }
}

export default Unit;
