import { connect } from 'react-redux';
import { Sidebar } from '../components';

const mapStateToProps = state => ({
  showSidebar: state.common.showSidebar
});

export default connect(
  mapStateToProps,
  null
)(Sidebar);
