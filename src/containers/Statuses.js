import { connect } from 'react-redux';
import Statuses from '../components/Main/Statuses';
import { sidebarToggler, setFavorite } from '../controller/actions';

const mapStateToProps = state => ({
  isFavorite: state.currentChat.isFavorite,
  currentUserID: state.currentUser.uuid,
  currentChatID: state.currentChat.chatID,
  currentChatType: state.currentChat.chatType,
  userFavoriteChats: state.currentUser.favoriteChats,
  showSidebar: state.common.showSidebar,
  connectionStatus: state.currentUser.connectionStatus,
  users: state.users.list
});

const mapDispatchToState = dispatch => ({
  sidebarToggler: () => dispatch(sidebarToggler()),
  setFavorite: payload => dispatch(setFavorite(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Statuses);
