import React from 'react';
import PropTypes from 'prop-types';

class Spinner extends React.PureComponent {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    width: '100%',
    height: '100%',
    color: '#d0a85d'
  }

  render() {
    const { width, height, color } = this.props;

    return (
      <span className='loadingSpinner' style={{ width, height }}>
        <svg className='lds-microsoft' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
          <g transform='rotate(0)'>
            <circle cx='73.801' cy='68.263' fill={color} r='3' transform='rotate(359.751 49.9984 49.9984)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='0s' />
            </circle>
            <circle cx='68.263' cy='73.801' fill={color} r='3' transform='rotate(0.169908 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.062s' />
            </circle>
            <circle cx='61.481' cy='77.716' fill={color} r='3' transform='rotate(1.83976 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.125s' />
            </circle>
            <circle cx='53.916' cy='79.743' fill={color} r='3' transform='rotate(5.37049 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.187s' />
            </circle>
            <circle cx='46.084' cy='79.743' fill={color} r='3' transform='rotate(11.1162 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.25s' />
            </circle>
            <circle cx='38.519' cy='77.716' fill={color} r='3' transform='rotate(19.1917 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.312s' />
            </circle>
            <circle cx='31.737' cy='73.801' fill={color} r='3' transform='rotate(30.207 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.375s' />
            </circle>
            <circle cx='26.199' cy='68.263' fill={color} r='3' transform='rotate(44.1593 50 50)'>
              <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;360 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' begin='-0.437s' />
            </circle>
            <animateTransform attributeName='transform' type='rotate' calcMode='spline' values='0 50 50;0 50 50' times='0;1' keySplines='0.5 0 0.5 1' repeatCount='indefinite' dur='1.5s' />
          </g>
        </svg>
      </span>
    );
  }
}

export default Spinner;
