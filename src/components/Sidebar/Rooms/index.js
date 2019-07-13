import React from 'react';

import PropTypes from 'prop-types';

import Unit from '../../../containers/Unit';
import Placeholder from '../../LoadingPlaceholder';

class Rooms extends React.PureComponent {
  static propTypes = {
    rooms: PropTypes.array.isRequired
  }

  _renderRooms = () => {
    const { rooms = {} } = this.props;

    if (!rooms || rooms.length === 0) {
      return (
        <Placeholder text='Trying to load rooms...' width='40px' height='40px' />
      );
    }

    return rooms.map(room => {
      const configuration = {
        name: room.ID,
        uuid: room.uuid,
        ID: room.ID,
        isConnected: true
      };

      return (
        <Unit type='rooms' key={room.uuid} configuration={configuration} />
      );
    });
  };

  render() {
    return (
      <div className='usersList'>{this._renderRooms()}</div>
    );
  }
}

export default Rooms;
