import React from 'react';
import PropTypes from 'prop-types';

class SectionTitle extends React.PureComponent {
  static defaultProps = {
    title: '',
    children: []
  }

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
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
