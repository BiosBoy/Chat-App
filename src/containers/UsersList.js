import { connect } from 'react-redux';
import UsersListComponent from '../components/UsersList';

const mapDispatchToState = state => ({
  users: state.users
});

export default connect(
  mapDispatchToState,
  null
)(UsersListComponent);
