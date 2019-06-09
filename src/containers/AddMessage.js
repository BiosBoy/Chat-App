import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from '../actions';

const mapDispatchToState = state => {
  return ({
    currentUser: state.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  dispatchMessage: (message, uuid, author) => dispatch(addMessage(message, uuid, author))
});

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(AddMessageComponent);
