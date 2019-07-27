import { connect } from 'react-redux';
import { Main } from '../components';
import { sidebarToggler, hideSidebar } from '../controller/actions';

const mapDispatchToState = state => {
  return {
    users: state.users.list,
    showSidebar: state.common.showSidebar,
    connectionStatus: state.currentUser.connectionStatus,
    currentChat: state.currentChat,
    typingUsers: state.common.typingUsers
  };
};

const mapDispatchStateToProps = dispatch => ({
  sidebarToggler: () => dispatch(sidebarToggler()),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(
  mapDispatchToState,
  mapDispatchStateToProps
)(Main);
