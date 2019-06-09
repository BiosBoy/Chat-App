import React from 'react';
import PropTypes from 'prop-types';

const UsersList = props => {
  const { users = [] } = props;

  const getUsers = () => users.map(user => <li key={user.uuid}>{user.name}</li>);

  return (
    <aside i='sidebar' className='sidebar'>
      <span className='sectionTitle usersTitle'>Users Online</span>
      <ul className='usersList'>{getUsers()}</ul>
    </aside>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default UsersList;
