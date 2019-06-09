import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  const { message, author, timestamp } = props;

  const getTimestamp = () => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hours}:${minutes}`;
  };

  return (
    <div className='messageWrap'>
      <span className='authorWrap'>{author}</span>
      <div className='messageContainer'>
        <span className='messageTimestamp'>{getTimestamp()}</span>
        <span className='textWrap'>{message}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default Message;
