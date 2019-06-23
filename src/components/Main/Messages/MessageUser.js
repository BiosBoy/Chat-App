import React from 'react';
import PropTypes from 'prop-types';

import getTimestamp from '../../../utils/getTime';

class MessageUser extends React.PureComponent {
  static propTypes = {
    isCurrentUser: PropTypes.bool,
    uuid: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }

  static defaultProps = {
    isCurrentUser: false
  }

  _renderDate = () => {
    const { timestamp } = this.props;

    return getTimestamp(timestamp);
  }

  render() {
    const { isCurrentUser, message, uuid } = this.props;

    return (
      <div key={uuid} className={`message newUserConnectedWrap${isCurrentUser ? ' newUsercurrentUserMessage' : ''}`}>
        <span className='newUserConnectedMessage'>
          {message}
        </span>
        <span className='newUserConnectedTimestamp'>
          {this._renderDate()}
        </span>
      </div>
    );
  }
}

export default MessageUser;
