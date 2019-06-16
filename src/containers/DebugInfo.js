import { connect } from 'react-redux';
import { DebugInfo } from '../components';
import { hideDebugManual } from '../controller/actions';

const mapDispatchStateToProps = dispatch => ({
  hideDebugFunc: () => dispatch(hideDebugManual())
});

export default connect(null, mapDispatchStateToProps)(DebugInfo);
