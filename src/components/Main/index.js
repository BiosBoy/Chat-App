import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SectionTitle from '../SectionTitle';
import Chat from '../../containers/Chat';
import LiveMessageTyping from './LiveMessageTyping';
import AddMessage from '../../containers/AddMessage';

import { CONNECTED, DISCONNECTED } from '../../constants/connectionStatuses';

const USER_TOGGLER_TITLE = 'Sidebar';

class Main extends React.Component {
  static propTypes = {
    typingUsers: PropTypes.array,
    currentChat: PropTypes.shape({
      title: PropTypes.string,
      chatType: PropTypes.string,
      chatID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    connectionStatus: PropTypes.string,
    showUsersList: PropTypes.bool,
    users: PropTypes.array,
    usersListToogle: PropTypes.func
  };

  static defaultProps = {
    currentChat: {
      title: 'global',
      chatType: 'global',
      chatID: 'global'
    },
    connectionStatus: '',
    showUsersList: true,
    typingUsers: [],
    users: [],
    usersListToogle: () => {}
  }

  _handleClick = () => {
    const { usersListToogle } = this.props;

    usersListToogle();
  }

  _getUsersCountInChat = () => {
    const { users } = this.props;

    return (
      <span className='usersRoomCount'>
        <i className='usersRoomCountIcon' />
        {`${users.length} | `}
      </span>
    );
  }

  _getSidebarToggle = () => {
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
        <i className='connectionStatusIconMain' />
        <i className={`connectionStatusIcon ${connectionStatusesClasses}`} />
      </span>
    );
  }

  render() {
    const { currentChat, typingUsers } = this.props;

    return (
      <section id='main'>
        <div className='topSectionMain'>
          <SectionTitle title={`#${currentChat.title}`}>
            {this._getSidebarToggle()}
            {this._getUsersCountInChat()}
            {this._getConnectionStatus()}
          </SectionTitle>
        </div>
        <div className='middleSectionMain'>
          <Chat />
          <LiveMessageTyping currentChat={currentChat} typingUsers={typingUsers} />
        </div>
        <div className='bottomSectionMain'>
          <AddMessage />
        </div>
      </section>
    );
  }
}

export default Main;
