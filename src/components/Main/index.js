import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SectionTitle from '../SectionTitle';
import MessagesList from '../../containers/MessagesList';
import LiveMessageTyping from './LiveMessageTyping';
import AddMessage from '../../containers/AddMessage';

import { CONNECTED, DISCONNECTED } from '../../constants/connectionStatuses';

const MESSAGE_TITLE = 'Chat Messages';
const USER_TOGGLER_TITLE = 'users';

class Main extends React.PureComponent {
  static propTypes = {
    typingUsers: PropTypes.array,
    currentUserName: PropTypes.string,
    connectionStatus: PropTypes.string,
    showUsersList: PropTypes.bool,
    usersListToogle: PropTypes.func
  };

  static defaultProps = {
    currentUserName: '',
    connectionStatus: '',
    showUsersList: true,
    typingUsers: [],
    usersListToogle: () => {}
  }

  _handleClick = () => {
    const { usersListToogle } = this.props;

    usersListToogle();
  }

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
      <SectionTitle title={MESSAGE_TITLE}>
        {this._getUsersListToggle()}
        {this._getConnectionStatus()}
      </SectionTitle>
    );
  }

  render() {
    const { typingUsers } = this.props;

    return (
      <section id='main'>
        <div className='topSectionMain'>
          {this._renderTopSection()}
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
