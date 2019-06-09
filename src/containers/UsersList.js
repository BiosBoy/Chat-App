import { connect } from 'react-redux';
import UsersListComponent from '../components/UsersList';

const mapDispatchToState = state => ({
  users: state.users,
  currentUser: state.currentUser
});

export default connect(
  mapDispatchToState,
  null
)(UsersListComponent);
