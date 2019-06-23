import { connect } from 'react-redux';
import { Main } from '../components';
import { usersToggler } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    showUsersList: state.users.mobileLayout,
    connectionStatus: state.currentUser.connectionStatus,
    typingUsers: state.common.typingUsers
  });
};

const mapDispatchStateToProps = dispatch => ({
  usersListToogle: () => dispatch(usersToggler())
});

export default connect(mapDispatchToState, mapDispatchStateToProps)(Main);
