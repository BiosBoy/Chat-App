import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from '../actions';

const mapDispatchToState = state => {
  return ({
    currentUser: state.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  dispatchMessage: (message, uuid, uuidAuthor, author, timestamp) => dispatch(addMessage(message, uuid, uuidAuthor, author, timestamp))
});

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(AddMessageComponent);
