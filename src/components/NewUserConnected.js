import React from 'react';
import PropTypes from 'prop-types';

import getTimestamp from '../utils/getTime';

class NewUserConnected extends React.PureComponent {
  static propTypes = {
    uuid: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }

  _renderDate = () => {
    const { timestamp } = this.props;

    return getTimestamp(timestamp);
  }

  render() {
    const { message, uuid } = this.props;

    return (
      <div key={uuid} className='message newUserConnectedWrap'>
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

export default NewUserConnected;
