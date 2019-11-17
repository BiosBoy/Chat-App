import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Sidebar from '../containers/Sidebar';
import Main from '../containers/Main';
import PopUp from '../components/PopUp';
import Login from '../components/Login';

import { CONNECTED, DISCONNECTED } from '../constants/connectionStatuses';

import '../App.css';

class AppLayout extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool,
    connectionStatus: PropTypes.string,
    disableBlurOverlay: PropTypes.bool
  }

  static defaultProps = {
    connectionStatus: '',
    isAuth: false,
    disableBlurOverlay: false
  }

  _connectionLayoutChecker = () => {
    const { connectionStatus, disableBlurOverlay } = this.props;

    const connectionClassesLayout = classnames({
      connectedUserOvelay: connectionStatus === CONNECTED,
      disconnectedUserOverlay: connectionStatus === DISCONNECTED,
      destroyBlurOverlay: disableBlurOverlay
    });

    return connectionClassesLayout;
  }

  _renderEnhancers = () => {
    const { isAuth } = this.props;

    if (isAuth) {
      return null;
    }

    return (
      <PopUp type='login'>
        <Login messageType='notLogged' />
      </PopUp>
    );
  }

  _renderMainApp = () => {
    return (
      <div id='container' className={`mainOverlay ${this._connectionLayoutChecker()}`}>
        <Sidebar />
        <Main />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this._renderEnhancers()}
        {this._renderMainApp()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  connectionStatus: state.currentUser.connectionStatus,
  disableBlurOverlay: state.common.disableBlurOverlay,
  isAuth: state.currentUser.isAuth
});

export default connect(
  mapStateToProps,
  null
)(AppLayout);
