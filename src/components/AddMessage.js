import React from 'react';
import PropTypes from 'prop-types';

import generateUUID from '../utils/uuid';

class AddMessage extends React.PureComponent {
  static propTypes = {
    dispatchMessage: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      uuid: PropTypes.number,
      name: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  _onKeyPressHandler = e => {
    const { value } = this.state;
    const { currentUser: { name, uuid: uuidAuthor }, dispatchMessage } = this.props;

    if (e.key === 'Enter') {
      dispatchMessage(value, generateUUID(), uuidAuthor, name);

      this.setState({
        value: ''
      });
    }
  }

  _onChangeHandler = e => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const { value } = this.state;

    return (
      <section id='new-message'>
        <input
          onKeyPress={this._onKeyPressHandler}
          onChange={this._onChangeHandler}
          type='text'
          placeholder='Type your message...'
          value={value}
        />
      </section>
    );
  }
}

export default AddMessage;
