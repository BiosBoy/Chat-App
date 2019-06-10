import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import NewUserConnected from './NewUserConnected';

const messageTypes = {
  newUser: message => <NewUserConnected key={message.uuid} {...message} />,
  message: message => <Message key={message.uuid} {...message} />
};

const MessagesList = props => {
  const { messages } = props;

  const getMessages = () => messages.map(message => {
    const MessageToRender = messageTypes[message.layout] || messageTypes.message;

    return MessageToRender(message);
  });

  return (
    <section id='message-list'>
      <span className='sectionTitle chatTitle'>Chat Messages</span>
      <div className='messagesList'>{getMessages()}</div>
      <hr className='boxShadowBefore' />
    </section>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MessagesList;
