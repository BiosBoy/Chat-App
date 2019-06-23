import React from 'react';
import PropTypes from 'prop-types';

import UsersList from '../../containers/UsersList';
import SectionTitle from '../SectionTitle';

class Sidebar extends React.PureComponent {
  static defaultProps = {
    mobileLayout: false
  }

  static propTypes = {
    mobileLayout: PropTypes.bool
  }

  render() {
    const { mobileLayout } = this.props;

    return (
      <aside id='sidebar' className={`sidebar${mobileLayout ? ' sidebarListShow' : ''}`}>
        <SectionTitle title='Users Online' />
        <UsersList />
      </aside>
    );
  }
}

export default Sidebar;
