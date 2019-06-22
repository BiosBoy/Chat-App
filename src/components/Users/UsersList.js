import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import Placeholder from '../LoadingPlaceholder';

class UsersList extends React.PureComponent {
  static defaultProps = {
    currentUser: {
      uuid: null,
      name: ''
    },
    users: {
      mobileLayout: false
    }
  }

  static propTypes = {
    currentUser: PropTypes.shape({
      uuid: PropTypes.number,
      name: PropTypes.string
    }),
    users: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          uuid: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          cookie: PropTypes.string.isRequired,
          isConnected: PropTypes.bool.isRequired
        })
      ).isRequired,
      mobileLayout: PropTypes.bool
    })
  }

  _sortUserByTimestamp = (sortA, sortB) => {
    const { currentUser = {} } = this.props;

    if (sortB.cookie === currentUser.cookie) {
      return 1;
    }

    return sortA.timestamp - sortB.timestamp ? 1 : -1;
  }

  _renderUsers = () => {
    const { users = {}, currentUser = {} } = this.props;

    if (!users || users.list.length === 0) {
      return (
        <Placeholder text='Trying to load users...' width='40px' height='40px' />
      );
    }

    return users.list
      .sort(this._sortUserByTimestamp)
      .map(user => {
        const isCurrentUser = currentUser.cookie === user.cookie;

        return (
          <User key={user.uuid} user={user} isCurrentUser={isCurrentUser} />
        );
      });
  };

  render() {
    const { users: { mobileLayout } } = this.props;

    return (
      <aside i='sidebar' className={`sidebar${mobileLayout ? ' usersListShow' : ''}`}>
        <span className='sectionTitle usersTitle'>Users Online</span>
        <div className='usersList'>{this._renderUsers()}</div>
        <hr className='boxShadowBefore' />
      </aside>
    );
  }
}

export default UsersList;
