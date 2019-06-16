import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PopUp from '../PopUp';
import Spinner from '../Spinner';
import debugHandlers from '../../helpers/debugMessageHandlers';

class DebugInfo extends React.PureComponent {
  static propTypes = {
    errorType: PropTypes.string,
    showDebug: PropTypes.bool,
    hideDebugFunc: PropTypes.func
  }

  static defaultProps = {
    errorType: '',
    showDebug: false,
    hideDebugFunc: () => {}
  }

  _getDebugData = () => {
    const { errorType } = this.props;

    if (!errorType || !debugHandlers[errorType]) return {};

    return debugHandlers[errorType];
  }

  _renderMessage = () => {
    const { className = '', message = '' } = this._getDebugData();

    return (
      <span className={`debugText ${className}`}>{message}</span>
    );
  }

  _renderSpinner = () => {
    const { showSpinner = false } = this._getDebugData();

    if (!showSpinner) return null;

    return <Spinner width='50px' height='50px' />;
  }

  _getCustomButton = () => {
    const { button } = this._getDebugData();

    if (!button || !button.active) return null;

    const { type = 'button', href = '', buttonClass = '', buttonText = '', target = '' } = button;

    const isLink = type !== 'button';
    const CustomButtonTag = isLink ? 'a' : 'button';

    const buttonConfig = {
      type: 'button',
      className: `debugButton ${buttonClass}`,
      ...isLink && {
        href,
        target
      }
    };

    return (
      <CustomButtonTag {...buttonConfig}>
        {buttonText}
      </CustomButtonTag>
    );
  }

  _getCloseButton = () => {
    const { hideDebugFunc } = this.props;
    const { isCloseButton } = this._getDebugData();

    if (!isCloseButton) return null;

    return (
      <button type='button' className='debugButton closeDebugButton' onClick={hideDebugFunc}>
        Close
      </button>
    );
  }

  _renderButtons = () => {
    return (
      <div className='debugButtonsWrap'>
        {this._getCustomButton()}
        {this._getCloseButton()}
      </div>
    );
  }

  render() {
    const { showDebug } = this.props;
    const { type = '', message = '', showSpinner = '' } = this._getDebugData();

    if (!showDebug || !message) return null;

    return (
      <PopUp type={type}>
        <div className={`debugContainer${showSpinner && ' spinner'}`}>
          {this._renderMessage()}
          {this._renderSpinner()}
          {this._renderButtons()}
        </div>
      </PopUp>
    );
  }
}

const mapStateToProps = state => ({
  errorType: state.debug.errorType,
  showDebug: state.debug.showDebug
});

export default connect(mapStateToProps, null)(DebugInfo);
