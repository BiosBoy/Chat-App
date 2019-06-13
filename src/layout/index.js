import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UsersList from '../containers/UsersList';
import MessagesList from '../containers/MessagesList';
import AddMessage from '../containers/AddMessage';

import '../App.css';

class AppLayout extends React.PureComponent {
  static propTypes = {
    isDisconnected: PropTypes.bool
  }

  static defaultProps = {
    isDisconnected: false
  }

  render() {
    const { isDisconnected } = this.props;
    const isBluredLayout = isDisconnected ? 'disconectedUserOverlay' : '';

    return (
      <div id='container' className={`mainOverlay ${isBluredLayout}`}>
        <UsersList />
        <section id='main'>
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isDisconnected: state.currentUser.isDisconnected
});

export default connect(mapStateToProps, null)(AppLayout);
