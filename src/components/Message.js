import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, author, timestamp }) => {
  const getTimestamp = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hours}:${minutes}`;
  };

  return (
    <div className='messageWrap'>
      <span className='authorWrap'>{author}</span>
      <div className='messageContainer'>
        <span className='messageTimestamp'>{timestamp || getTimestamp()}</span>
        <span className='textWrap'>{message}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.string
};

export default Message;
