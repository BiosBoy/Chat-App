import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const AREAS_NAMES = {
  1: {
    name: 'users',
    svg: (
      <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 25 25'>
        <path d='M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z' />
      </svg>
    )
  },
  2: {
    name: 'rooms',
    svg: (
      <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='21' height='17' viewBox='0 0 24 24'>
        <path
          xmlns='http://www.w3.org/2000/svg'
          d='M20 9.352c0-4.852-4.751-8.352-10-8.352-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 7.697 1.877 13.307-2.842 13.307-7.892zm-14.5 1.38c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm4.5 0c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm4.5 0c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm8.383 8.789c-.029 1.001.558 2.435 1.088 3.479-1.419-.258-3.438-.824-4.352-1.385-3.365.818-6.114-.29-7.573-2.1 4.557-.66 8.241-3.557 9.489-7.342 1.48.979 2.465 2.491 2.465 4.274 0 1.12-.403 2.221-1.117 3.074z'
        />
      </svg>
    )
  },
  3: {
    name: 'favorites',
    svg: (
      <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='21' height='17' viewBox='0 0 24 24'>
        <path d='M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z' />
      </svg>
    )
  }
};

class AreaIndicators extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.number,
    activeArea: PropTypes.number,
    setActiveArea: PropTypes.func
  }

  static defaultProps = {
    areas: 1,
    activeArea: 1,
    setActiveArea: () => {}
  }

  _handleClick = e => {
    const {
      dataset: { area }
    } = e.currentTarget;

    const { setActiveArea } = this.props;

    setActiveArea(area);
  }

  _renderDots = () => {
    const { areas, activeArea } = this.props;

    const areasArray = Array.from(Array(areas).keys());

    const areasArrayDots = areasArray.map((area, index) => {
      const areaNumber = index + 1;
      const areaData = AREAS_NAMES[areaNumber];

      const classNames = classnames({
        dot: true,
        activeArea: activeArea === index + 1,
        [`dotArea${areaData.name.toUpperCase()}`]: true
      });

      return (
        <button data-area={areaData.name} type='button' key={area} onClick={this._handleClick} className={classNames}>
          {areaData.svg}
        </button>
      );
    });

    return areasArrayDots;
  }

  render() {
    return <div className='dotsWrap'>{this._renderDots()}</div>;
  }
}

export default AreaIndicators;
