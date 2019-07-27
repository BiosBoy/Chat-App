import React from 'react';
import PropTypes from 'prop-types';

import Statuses from '../../containers/Statuses';
import SectionTitle from '../SectionTitle';
import Chat from '../../containers/Chat';
import LiveMessageTyping from './LiveMessageTyping';
import AddMessage from '../../containers/AddMessage';

class Main extends React.Component {
  static propTypes = {
    typingUsers: PropTypes.array,
    currentChat: PropTypes.shape({
      title: PropTypes.string,
      chatType: PropTypes.string,
      chatID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    connectionStatus: PropTypes.string,
    showSidebar: PropTypes.bool,
    users: PropTypes.array,
    hideSidebar: PropTypes.func
  }

  static defaultProps = {
    currentChat: {
      title: 'global',
      chatType: 'global',
      chatID: 'global'
    },
    connectionStatus: '',
    typingUsers: [],
    users: [],
    showSidebar: false,
    hideSidebar: () => {}
  }

  _hideSidebar = () => {
    const { showSidebar, hideSidebar } = this.props;

    showSidebar && hideSidebar();
  }

  _handleClick = () => {
    this._hideSidebar();
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

  render() {
    const { currentChat, typingUsers } = this.props;

    return (
      <section role='button' onKeyDown={undefined} id='main' onClick={this._handleClick}>
        <div className='topSectionMain'>
          <SectionTitle title={`#${currentChat.title}`}>
            <Statuses />
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
