import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from '../actions';

const mapDispatchToProps = dispatch => ({
  dispatchMessage: (message, author) => dispatch(addMessage(message, author))
});

export default connect(
  null,
  mapDispatchToProps
)(AddMessageComponent);
