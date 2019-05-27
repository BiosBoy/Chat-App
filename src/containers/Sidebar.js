import { connect } from 'react-redux';
import SidebarComponent from '../components/Sidebar';

const mapDispatchToState = state => ({
  users: state.users
});

export default connect(
  mapDispatchToState,
  null
)(SidebarComponent);
