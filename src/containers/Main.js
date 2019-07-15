import { connect } from 'react-redux';
import { Main } from '../components';
import { usersToggler, hideSidebar } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    users: state.users.list,
    mobileLayout: state.users.mobileLayout,
    showUsersList: state.users.mobileLayout,
    connectionStatus: state.currentUser.connectionStatus,
    currentChat: state.currentChat,
    typingUsers: state.common.typingUsers
  });
};

const mapDispatchStateToProps = dispatch => ({
  usersListToogle: () => dispatch(usersToggler()),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(mapDispatchToState, mapDispatchStateToProps)(Main);
