import React from 'react';
import PropTypes from 'prop-types';

import Unit from '../../../containers/Unit';
import Placeholder from '../../LoadingPlaceholder';

class UsersList extends React.PureComponent {
  static defaultProps = {
    currentUser: {
      uuid: null,
      name: ''
    },
    users: []
  }

  static propTypes = {
    currentUser: PropTypes.shape({
      uuid: PropTypes.number,
      name: PropTypes.string
    }),
    users: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          uuid: PropTypes.number,
          name: PropTypes.string,
          cookie: PropTypes.string,
          isConnected: PropTypes.bool
        })
      ).isRequired
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

        const configuration = {
          name: user.name,
          uuid: user.uuid,
          ID: user.uuid,
          isConnected: user.isConnected
        };

        return (
          <Unit key={user.uuid} type='direct' configuration={configuration} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        );
      });
  };

  render() {
    return (
      <div className='usersList'>{this._renderUsers()}</div>
    );
  }
}

export default UsersList;
