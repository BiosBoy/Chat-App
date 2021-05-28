import React from 'react';
import PropTypes from 'prop-types';

class SectionTitle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    title: '',
    children: []
  }

  render() {
    const { title, children } = this.props;

    return (
      <div className='sectionTitleWrap'>
        <span className='sectionTitle usersTitle'>{title}</span>
        {children}
        <hr className='boxShadowBefore' />
      </div>
    );
  }
}

export default SectionTitle;
