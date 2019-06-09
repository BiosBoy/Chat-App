import React from 'react';
import PropTypes from 'prop-types';

const UsersList = props => {
  const { users = [], currentUser = {} } = props;

  const getUsers = () => {
    return users.map(user => {
      const isCurrentUser = currentUser.uuid === user.uuid;

      return (
        <li key={user.uuid}>{isCurrentUser ? `${user.name} (you)` : user.name}</li>
      );
    });
  };

  return (
    <aside i='sidebar' className='sidebar'>
      <span className='sectionTitle usersTitle'>Users Online</span>
      <ul className='usersList'>{getUsers()}</ul>
    </aside>
  );
};

UsersList.defaultProps = {
  currentUser: {
    uuid: null,
    name: ''
  }
};

UsersList.propTypes = {
  currentUser: PropTypes.shape({
    uuid: PropTypes.number,
    name: PropTypes.string
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default UsersList;
