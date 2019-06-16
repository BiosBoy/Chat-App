import React from 'react';
import PropTypes from 'prop-types';

class User extends React.PureComponent {
  static defaultProps = {
    isCurrentUser: false
  }

  static propTypes = {
    isCurrentUser: PropTypes.bool,
    user: PropTypes.shape({
      uuid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { user, isCurrentUser } = this.props;

    return (
      <div key={user.uuid} className='authorContainer'>
        <span className='authorAvatar authorWrap'>
          <svg width='100%' height='100%' data-jdenticon-value={user.name} />
        </span>
        <span className='authorName sidebarAuthorName'>{isCurrentUser ? `${user.name} (you)` : user.name}</span>
      </div>
    );
  }
}

export default User;
