import { connect } from 'react-redux';
import { MessagesList } from '../components';
import { usersToggler } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    messages: state.messages,
    currentUserName: state.currentUser.name,
    showUsersList: state.users.mobileLayout,
    connectionStatus: state.currentUser.connectionStatus,
    typingUsers: state.common.typingUsers
  });
};

const mapDispatchStateToProps = dispatch => ({
  usersListToogle: () => dispatch(usersToggler())
});

export default connect(mapDispatchToState, mapDispatchStateToProps)(MessagesList);
