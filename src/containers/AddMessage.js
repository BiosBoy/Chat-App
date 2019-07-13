import { connect } from 'react-redux';
import AddMessageComponent from '../components/Main/Messages/AddMessage';
import { addMessage, userTyping } from '../controller/actions';

const mapDispatchToState = state => {
  return ({
    currentUser: state.currentUser,
    currentChat: state.currentChat
  });
};

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  dispatchMessage: payload => dispatch(addMessage(payload)),
  dispatchLiveTyping: payload => dispatch(userTyping(payload))
});

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(AddMessageComponent);
