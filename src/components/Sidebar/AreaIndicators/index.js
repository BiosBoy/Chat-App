import React from 'react';
import PropTypes from 'prop-types';

class AreaIndicators extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.number,
    activeArea: PropTypes.number
  }

  static defaultProps = {
    areas: 1,
    activeArea: 1
  }

  _renderDots = () => {
    const { areas, activeArea } = this.props;

    const areasArray = Array.from(Array(areas).keys());

    const areasArrayDots = areasArray.map((area, index) => {
      return (
        <span key={area} className={`dot${activeArea === (index + 1) ? ' activeArea' : ''}`} />
      );
    });

    return areasArrayDots;
  }

  render() {
    return (
      <div className='dotsWrap'>
        {this._renderDots()}
      </div>
    );
  }
}

export default AreaIndicators;
