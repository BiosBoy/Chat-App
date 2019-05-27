import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = props => {
  console.log(props);
  const { users = [] } = props;

  const getUsers = () => users.map((user, index) => <li key={user.id + index}>{user.name}</li>);

  return (
    <aside i='sidebar' className='sidebar'>
      <span className='sectionTitle usersTitle'>Users Online</span>
      <ul className='usersList'>{getUsers()}</ul>
    </aside>
  );
};

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Sidebar;
