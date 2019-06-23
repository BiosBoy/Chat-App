import { connect } from 'react-redux';
import { Sidebar } from '../components';

const mapStateToProps = state => ({
  mobileLayout: state.users.mobileLayout
});

export default connect(
  mapStateToProps,
  null
)(Sidebar);
