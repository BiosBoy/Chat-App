import { connect } from 'react-redux';
import AddMessageComponent from '../components/Main/Messages/AddMessage';
import { addMessage, userTyping } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    currentUser: state.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  dispatchMessage: (messageType, message, uuid, uuidAuthor, author, timestamp) => dispatch(addMessage(messageType, message, uuid, uuidAuthor, author, timestamp)),
  dispatchLiveTyping: payload => dispatch(userTyping(payload))
});

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(AddMessageComponent);
