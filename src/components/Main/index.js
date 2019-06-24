import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SectionTitle from '../SectionTitle';
import MessagesList from '../../containers/MessagesList';
import LiveMessageTyping from './LiveMessageTyping';
import AddMessage from '../../containers/AddMessage';

import { CONNECTED, DISCONNECTED } from '../../constants/connectionStatuses';

const MESSAGE_TITLE = '#global';
const USER_TOGGLER_TITLE = 'Users';

class Main extends React.PureComponent {
  static propTypes = {
    typingUsers: PropTypes.array,
    currentUserName: PropTypes.string,
    connectionStatus: PropTypes.string,
    showUsersList: PropTypes.bool,
    users: PropTypes.array,
    usersListToogle: PropTypes.func
  };

  static defaultProps = {
    currentUserName: '',
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
        {`Users in chat: ${users.length} | `}
      </span>
    );
  }

  _getUsersListToggle = () => {
    const { users, showUsersList = false } = this.props;

    return (
      <button
        className={`asideButtonToggle${showUsersList ? ' asideButtonToggleActive' : ''}`}
        type='button'
        onClick={this._handleClick}
      >
        {`${USER_TOGGLER_TITLE}: ${users.length}`}
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

  render() {
    const { typingUsers } = this.props;

    return (
      <section id='main'>
        <div className='topSectionMain'>
          <SectionTitle title={MESSAGE_TITLE}>
            {this._getUsersCountInChat()}
            {this._getUsersListToggle()}
            {this._getConnectionStatus()}
          </SectionTitle>
        </div>
        <div className='middleSectionMain'>
          <MessagesList />
          <LiveMessageTyping typingUsers={typingUsers} />
        </div>
        <div className='bottomSectionMain'>
          <AddMessage />
        </div>
      </section>
    );
  }
}

export default Main;
