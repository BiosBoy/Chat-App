import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

class Placeholder extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }

  static defaultProps = {
    text: '',
    width: '40px',
    height: '40px'
  }

  render() {
    const { text, width, height } = this.props;

    return (
      <div className='loadingPlaceholder'>
        <Spinner width={width} height={height} color='#fff' />
        <span className='placeholderText'>
          {text}
        </span>
      </div>
    );
  }
}

export default Placeholder;
