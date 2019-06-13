import { connect } from 'react-redux';
import { UsersList } from '../components';

const mapDispatchToState = state => ({
  users: state.users,
  currentUser: state.currentUser
});

export default connect(
  mapDispatchToState,
  null
)(UsersList);
