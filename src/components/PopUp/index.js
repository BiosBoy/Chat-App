import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PopUp extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string
  }

  static defaultProps = {
    type: ''
  }

  render() {
    const { children, type } = this.props;

    return (
      <div className={`popUpContainer ${type}`}>
        {children}
      </div>
    );
  }
}

export default PopUp;
