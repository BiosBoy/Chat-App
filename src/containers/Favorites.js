import { connect } from 'react-redux';
import Favorites from '../components/Sidebar/Favorites';

const mapStateToProps = state => ({
  directs: state.chats.direct,
  users: state.users.list,
  rooms: state.chats.rooms,
  favorites: state.currentUser.favoriteChats,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Favorites);
