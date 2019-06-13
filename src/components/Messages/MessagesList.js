import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import NewUserConnected from '../Users/NewUserConnected';

class MessagesList extends React.PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: 0
    };

    this.ref = React.createRef();
  }

  componentDidMount() {
    this._setScrollHeightState();
  }

  componentDidUpdate(nextProps, prevState) {
    if (prevState.scrollHeight !== this.ref.current.scrollHeight) {
      this._setScrollHeightState();
      this._setScrollTop();
    }
  }

  _setScrollHeightState = () => {
    this.setState({
      scrollHeight: this.ref.current.scrollHeight || 0
    });
  }

  _setScrollTop = () => {
    const currentRef = this.ref.current;

    currentRef.scrollTop = currentRef.scrollHeight;
  }

  _messageTypes = () => ({
    newUser: message => <NewUserConnected key={message.uuid} {...message} />,
    message: message => <Message key={message.uuid} {...message} />
  })

  _renderMessages = () => {
    const { messages } = this.props;

    return messages.map(message => {
      const MessageToRender = this._messageTypes()[message.layout] || this._messageTypes().message;

      return MessageToRender(message);
    });
  }

  render() {
    return (
      <section id='message-list'>
        <span className='sectionTitle chatTitle'>Chat Messages</span>
        <div ref={this.ref} className='messagesList'>{this._renderMessages()}</div>
        <hr className='boxShadowBefore' />
      </section>
    );
  }
}

export default MessagesList;
