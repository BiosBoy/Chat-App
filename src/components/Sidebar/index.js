import React from 'react';
import PropTypes from 'prop-types';

import UsersList from '../../containers/UsersList';
import SectionTitle from '../SectionTitle';

const ZONES_TRANSLATE_SHIFT = {
  rooms: 0,
  users: -238
};

class Sidebar extends React.PureComponent {
  static defaultProps = {
    mobileLayout: false
  }

  static propTypes = {
    mobileLayout: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      currentArea: '',
      sliderTranlateXStart: null
    };

    this.ref = React.createRef();
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('mousemove', this._handleMove);
    this.ref.current.removeEventListener('touchmove', this._handleMove);
  }

  _getMouseCoord = e => {
    const touchCoord = e.touches && e.touches[0].clientX && Math.ceil(e.touches[0].clientX);
    const mouseCoord = e.clientX;

    return touchCoord || mouseCoord;
  }

  _isMoveInDangerZone = (currentMove, sliderTranlateXStart) => {
    const moveBackDangerZone = currentMove - sliderTranlateXStart > -3;
    const moveForwardDangerZone = currentMove - sliderTranlateXStart < 3;

    return moveBackDangerZone && moveForwardDangerZone;
  };

  _handleMove = e => {
    const { sliderTranlateXStart } = this.state;

    const currentMove = this._getMouseCoord(e);

    if (this._isMoveInDangerZone(currentMove, sliderTranlateXStart)) {
      return;
    }

    if (currentMove - sliderTranlateXStart > 10) {
      this.setState({
        currentArea: 'rooms'
      });
    } else if (currentMove - sliderTranlateXStart < -10) {
      this.setState({
        currentArea: 'users'
      });
    }
  }

  _handleDown = e => {
    this.setState({
      sliderTranlateXStart: this._getMouseCoord(e)
    });

    this.ref.current.addEventListener('mousemove', this._handleMove);
    this.ref.current.addEventListener('touchmove', this._handleMove);
  }

  _handleUp = () => {
    this.setState({
      sliderTranlateXStart: null
    });

    this.ref.current.removeEventListener('mousemove', this._handleMove);
    this.ref.current.removeEventListener('touchmove', this._handleMove);
  }

  _handleContexMenu = e => e.preventDefault()

  _renderTitle = title => {
    return (
      <div className='titleSidebar'>
        <SectionTitle title={title} />
      </div>
    );
  }

  _renderUsersSection = () => {
    return (
      <div className='sidebarSection usersSection'>
        {this._renderTitle('Users')}
        <UsersList />
      </div>
    );
  }

  _renderRoomsSection = () => {
    return (
      <div className='sidebarSection roomsSection'>
        {this._renderTitle('Rooms')}
        <UsersList />
      </div>
    );
  }

  render() {
    const { currentArea } = this.state;
    const { mobileLayout } = this.props;

    return (
      <aside
        id='sidebar'
        role='slider'
        aria-valuemax={238}
        aria-valuemin={0}
        aria-valuenow={0}
        tabIndex={0}
        ref={this.ref}
        onTouchStart={this._handleDown}
        onTouchEnd={this._handleUp}
        onMouseDown={this._handleDown}
        onMouseUp={this._handleUp}
        onMouseLeave={this._handleUp}
        onContextMenu={this._handleContexMenu}
        className={`sidebar${mobileLayout ? ' sidebarListShow' : ''}`}
      >
        <div
          style={{ transform: `translateX(${ZONES_TRANSLATE_SHIFT[currentArea]}px)` }}
          className='sidebarSectionsContainer'
        >
          {this._renderUsersSection()}
          {this._renderRoomsSection()}
        </div>
      </aside>
    );
  }
}

export default Sidebar;
