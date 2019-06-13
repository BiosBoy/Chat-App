import React from 'react';
import PropTypes from 'prop-types';

const UsersList = props => {
  const { users = [], currentUser = {} } = props;

  const getUsers = () => {
    return users.map(user => {
      const isCurrentUser = currentUser.uuid === user.uuid;

      return (
        <div key={user.uuid} className='authorContainer'>
          <span className='authorAvatar authorWrap'>
            <svg width='100%' height='100%' data-jdenticon-value={user.name} />
          </span>
          <span className='authorName sidebarAuthorName'>{isCurrentUser ? `${user.name} (you)` : user.name}</span>
        </div>
      );
    });
  };

  return (
    <aside i='sidebar' className='sidebar'>
      <span className='sectionTitle usersTitle'>Users Online</span>
      <div className='usersList'>{getUsers()}</div>
      <hr className='boxShadowBefore' />
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
