import React from 'react';

import PropTypes from 'prop-types';

import Unit from '../../../containers/Unit';
import Placeholder from '../../LoadingPlaceholder';

class Favorites extends React.PureComponent {
  static propTypes = {
    directs: PropTypes.array,
    rooms: PropTypes.array,
    users: PropTypes.array,
    favorites: PropTypes.array,
    currentUser: PropTypes.object
  }

  static defaultProps = {
    directs: [],
    rooms: [],
    users: [],
    favorites: [],
    currentUser: {}
  }

  _findFavorite = () => {
    const { directs, rooms, users, favorites, currentUser } = this.props;
    const favoritesList = [];

    if (!favorites) {
      return null;
    }

    const channelsIterator = ({ channels, type }) => {
      channels.forEach(channel => {
        favorites.forEach(favoriteChannel => {
          if ((favoriteChannel.ID !== channel.ID) || (favoriteChannel.type !== channel.type)) {
            return;
          }

          const config = {
            ...channel,
            channelType: type
          };

          if (type === 'direct') {
            const realID = Number(channel.ID) - Number(currentUser.uuid);
            const userName = users.find(user => user.uuid === realID);

            config.name = userName.name;
            config.uuid = realID;
          }

          favoritesList.push(config);
        });
      });
    };

    channelsIterator({ channels: rooms, type: 'rooms' });
    channelsIterator({ channels: directs, type: 'direct' });

    return favoritesList;
  }

  _renderRooms = () => {
    const { rooms = [], users = [] } = this.props;

    if ((!rooms && !users) || rooms.length + users.length === 0) {
      return <Placeholder text='Trying to load favorites...' width='40px' height='40px' />;
    }

    const favorites = this._findFavorite();

    return favorites.map(channel => {
      const configuration = {
        name: channel.name || channel.ID,
        uuid: channel.uuid,
        ID: Number(channel.name && channel.uuid) || channel.ID,
        isConnected: true
      };

      return <Unit key={channel.uuid} type={channel.channelType} configuration={configuration} />;
    });
  }

  render() {
    return <div className='usersList'>{this._renderRooms()}</div>;
  }
}

export default Favorites;
