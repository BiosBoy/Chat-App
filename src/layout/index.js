import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Sidebar from '../containers/Sidebar';
import Main from '../containers/Main';

import {
  CONNECTED,
  DISCONNECTED
} from '../constants/connectionStatuses';

import '../App.css';

class AppLayout extends React.Component {
  static propTypes = {
    connectionStatus: PropTypes.string,
    disableBlurOverlay: PropTypes.bool
  }

  static defaultProps = {
    connectionStatus: '',
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

  render() {
    return (
      <div id='container' className={`mainOverlay ${this._connectionLayoutChecker()}`}>
        <Sidebar />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  connectionStatus: state.currentUser.connectionStatus,
  disableBlurOverlay: state.common.disableBlurOverlay
});

export default connect(mapStateToProps, null)(AppLayout);
