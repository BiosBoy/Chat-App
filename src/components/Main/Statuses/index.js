import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { CONNECTED, DISCONNECTED } from '../../../constants/connectionStatuses';

const USER_TOGGLER_TITLE = 'Sidebar';
const HEARTS = {
  thin: (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='-2 -2 28 28' fill='currentColor'>
      <path d='M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z' />
    </svg>
  ),
  full: (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='-2 -2 28 28' fill='currentColor'>
      <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
    </svg>
  )
};

class Statuses extends React.Component {
  static propTypes = {
    showSidebar: PropTypes.bool,
    connectionStatus: PropTypes.string,
    sidebarToggler: PropTypes.func,
    setFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
    userFavoriteChats: PropTypes.array,
    currentUserID: PropTypes.number,
    currentChatID: PropTypes.string,
    currentChatType: PropTypes.string,
    users: PropTypes.array
  }

  static defaultProps = {
    showSidebar: false,
    connectionStatus: 'disconnected',
    sidebarToggler: () => {},
    setFavorite: () => {},
    userFavoriteChats: [],
    currentUserID: null,
    currentChatID: null,
    currentChatType: null,
    isFavorite: false,
    users: []
  }

  _handleToggleClick = () => {
    const { showSidebar, sidebarToggler } = this.props;

    !showSidebar && sidebarToggler();
  }

  _handleFavoriteClick = () => {
    const { setFavorite, currentUserID, currentChatID, currentChatType } = this.props;

    setFavorite({ userID: currentUserID, chat: { ID: currentChatID, type: currentChatType } });
  }

  _getSidebarToggle = () => {
    const { showSidebar = false } = this.props;

    return (
      <button
        className={`asideButtonToggle${showSidebar ? ' asideButtonToggleActive' : ''}`}
        type='button'
        onClick={this._handleToggleClick}
      >
        {USER_TOGGLER_TITLE}
      </button>
    );
  }

  _getFavoriteButton = () => {
    const { userFavoriteChats, currentChatID, currentChatType } = this.props;
    const { thin, full } = HEARTS;

    const checkIsFavoriteChat = () => (
      userFavoriteChats.find(chat => (chat.ID === currentChatID) && (chat.type === currentChatType))
    );

    const currentHeart = checkIsFavoriteChat() ? full : thin;

    return (
      <span className='usersRoomFavorite'>
        <button type='button' className='usersRoomFavoriteButton' onClick={this._handleFavoriteClick}>
          {currentHeart}
        </button>
      </span>
    );
  }

  _getUsersCountInChat = () => {
    const { users } = this.props;

    return (
      <span className='usersRoomCount'>
        <i className='usersRoomCountIcon' />
        {users.length}
      </span>
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
    return (
      <div className='statusesWrap'>
        {this._getSidebarToggle()}
        {this._getFavoriteButton()}
        {'|'}
        {this._getUsersCountInChat()}
        {'|'}
        {this._getConnectionStatus()}
      </div>
    );
  }
}

export default Statuses;
