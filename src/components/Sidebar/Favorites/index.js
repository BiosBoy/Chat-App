import React from 'react';

import PropTypes from 'prop-types';

import Unit from '../../../containers/Unit';
import Placeholder from '../../LoadingPlaceholder';

class Favorites extends React.PureComponent {
  static propTypes = {
    rooms: PropTypes.array,
    users: PropTypes.array
  }

  static defaultProps = {
    rooms: [],
    users: []
  }

  _findFavorite = () => {
    const { rooms, users } = this.props;
    const favorites = [];

    rooms.concat(users).forEach(channel => {
      if (!channel.isFavorute) {
        return;
      }

      favorites.push(channel);
    });

    return favorites;
  }

  _renderRooms = () => {
    const { rooms = [], users = [] } = this.props;

    if ((!rooms && !users) || rooms.length + users.length === 0) {
      return <Placeholder text='Trying to load favorites...' width='40px' height='40px' />;
    }

    const favorites = this._findFavorite();

    return favorites.map(channel => {
      const configuration = {
        name: channel.ID,
        uuid: channel.uuid,
        ID: channel.ID,
        isConnected: true
      };

      return <Unit type='rooms' key={channel.uuid} configuration={configuration} />;
    });
  }

  render() {
    return <div className='usersList'>{this._renderRooms()}</div>;
  }
}

export default Favorites;
