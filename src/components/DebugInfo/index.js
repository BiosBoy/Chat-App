import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PopUp } from '..';
import errorHandler from '../../helpers/errorMessageHandlers';

class DebugInfo extends React.PureComponent {
  static propTypes = {
    errorType: PropTypes.string
  }

  static defaultProps = {
    errorType: ''
  }

  render() {
    const { errorType } = this.props;

    if (!errorType || !errorHandler[errorType]) return null;

    return (
      <PopUp type='error'>
        <span className='errorText'>{errorHandler[errorType].errorText}</span>
      </PopUp>
    );
  }
}

const mapStateToProps = state => ({
  errorType: state.debug.errorType
});

export default connect(mapStateToProps, null)(DebugInfo);
