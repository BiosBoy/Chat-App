import { connect } from 'react-redux';
import Users from '../components/Sidebar/Users';

const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Users);
