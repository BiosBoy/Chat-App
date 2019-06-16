import { connect } from 'react-redux';
import { UsersList } from '../components';

const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  null
)(UsersList);
