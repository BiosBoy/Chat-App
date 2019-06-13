import { connect } from 'react-redux';
import { AddMessage as AddMessageComponent } from '../components';
import { addMessage } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    currentUser: state.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  dispatchMessage: (messageType, message, uuid, uuidAuthor, author, timestamp) => dispatch(addMessage(messageType, message, uuid, uuidAuthor, author, timestamp))
});

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(AddMessageComponent);
