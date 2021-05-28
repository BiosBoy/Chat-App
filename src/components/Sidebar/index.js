import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AreaIndicators from './AreaIndicators';
import Users from '../../containers/Users';
import Rooms from '../../containers/Rooms';
import Favorites from '../../containers/Favorites';
import SectionTitle from '../SectionTitle';

const ZONES_TRANSLATE_SHIFT = {
  favorites: {
    id: 3,
    shift: -476
  },
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
  static propTypes = {
    showSidebar: PropTypes.bool
  }

  static defaultProps = {
    showSidebar: false
  }

  constructor(props) {
    super(props);

    this.state = {
      currentArea: 'users',
      sliderTranlateXStart: null
    };

    this.ref = React.createRef();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    const { currentArea } = this.state;

    if (prevState.currentArea !== currentArea) {
      this._removeMoveEvents();
    }
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
  }

  _handleMove = e => {
    const { sliderTranlateXStart } = this.state;

    const currentMove = this._getMouseCoord(e);

    if (this._isMoveInDangerZone(currentMove, sliderTranlateXStart)) {
      return;
    }

    this._getCurrentArea(currentMove);
  }

  _getCurrentArea = currentMove => {
    const { sliderTranlateXStart, currentArea } = this.state;

    const moveForward = areaName => {
      if (currentMove - sliderTranlateXStart < -10) {
        this._setCurrentArea(areaName);
      }
    };

    const moveBack = areaName => {
      if (currentMove - sliderTranlateXStart > 10) {
        this._setCurrentArea(areaName);
      }
    };

    if (currentArea === 'users') {
      moveForward('rooms');
    } else if (currentArea === 'rooms') {
      moveForward('favorites');
      moveBack('users');
    } else if (currentArea === 'favorites') {
      moveBack('rooms');
    }
  }

  _addMoveEvents = () => {
    this.ref.current.addEventListener('mousemove', this._handleMove);
    this.ref.current.addEventListener('touchmove', this._handleMove);
  }

  _removeMoveEvents = () => {
    this.ref.current.removeEventListener('mousemove', this._handleMove);
    this.ref.current.removeEventListener('touchmove', this._handleMove);
  }

  _handleDown = e => {
    this._setStartCoords(e);
    this._addMoveEvents();
  }

  _handleUp = () => {
    this._setStartCoords();
    this._removeMoveEvents();
  }

  _setCurrentArea = area => {
    this.setState({
      currentArea: area
    });
  }

  _setStartCoords = e => {
    this.setState({
      sliderTranlateXStart: e ? this._getMouseCoord(e) : null
    });
  }

  _handleSetCurrentArea = area => this._setCurrentArea(area)

  _handleContexMenu = e => e.preventDefault()

  _renderTitle = title => {
    return (
      <div className='titleSidebar'>
        <SectionTitle title={title} />
      </div>
    );
  }

  _renderSection = ({ className, title, section }) => {
    return (
      <div className={`sidebarSection ${className}`}>
        {this._renderTitle(title)}
        {section}
      </div>
    );
  }

  render() {
    const { currentArea } = this.state;
    const { showSidebar } = this.props;

    const { shift, id } = ZONES_TRANSLATE_SHIFT[currentArea] || {};
    const classNames = classnames({
      sidebar: true,
      sidebarListShow: showSidebar
    });

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
        className={classNames}
      >
        <div style={{ transform: `translateX(${shift}px)` }} className='sidebarSectionsContainer'>
          {this._renderSection({
            className: 'usersSection',
            title: 'Users',
            section: <Users />
          })}
          {this._renderSection({
            className: 'roomsSection',
            title: 'Rooms',
            section: <Rooms />
          })}
          {this._renderSection({
            className: 'favoritesSection',
            title: 'Favorites',
            section: <Favorites />
          })}
        </div>
        <AreaIndicators
          areas={Object.keys(ZONES_TRANSLATE_SHIFT).length}
          activeArea={id}
          setActiveArea={this._handleSetCurrentArea}
        />
      </aside>
    );
  }
}

export default Sidebar;
