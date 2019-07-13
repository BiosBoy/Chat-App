import React from 'react';
import PropTypes from 'prop-types';

import AreaIndicators from './AreaIndicators';
import Users from '../../containers/Users';
import Rooms from '../../containers/Rooms';
import SectionTitle from '../SectionTitle';

const ZONES_TRANSLATE_SHIFT = {
  rooms: {
    id: 2,
    shift: -238
  },
  users: {
    id: 1,
    shift: 0
  }
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
        currentArea: 'users'
      });
    } else if (currentMove - sliderTranlateXStart < -10) {
      this.setState({
        currentArea: 'rooms'
      });
    }
  }

  _handleDown = e => {
    // e.preventDefault();
    // e.stopPropagation();

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
        <Users />
      </div>
    );
  }

  _renderRoomsSection = () => {
    return (
      <div className='sidebarSection roomsSection'>
        {this._renderTitle('Rooms')}
        <Rooms />
      </div>
    );
  }

  render() {
    const { currentArea } = this.state;
    const { mobileLayout } = this.props;

    const { shift, id } = ZONES_TRANSLATE_SHIFT[currentArea] || {};

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
          style={{ transform: `translateX(${shift}px)` }}
          className='sidebarSectionsContainer'
        >
          {this._renderUsersSection()}
          {this._renderRoomsSection()}
        </div>
        <AreaIndicators areas={2} activeArea={id} />
      </aside>
    );
  }
}

export default Sidebar;
