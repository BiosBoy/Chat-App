import { connect } from 'react-redux';
import { MessagesList } from '../components';
import { usersToggler } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    messages: state.messages,
    showUsersList: state.users.mobileLayout,
    connectionStatus: state.currentUser.connectionStatus
  });
};

const mapDispatchStateToProps = dispatch => ({
  usersListToogle: () => dispatch(usersToggler())
});

export default connect(mapDispatchToState, mapDispatchStateToProps)(MessagesList);
