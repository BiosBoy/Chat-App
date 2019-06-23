import { connect } from 'react-redux';
import MessagesList from '../components/Main/Messages/MessagesList';

const mapDispatchToState = state => {
  return ({
    messages: state.messages,
    currentUserName: state.currentUser.name
  });
};

export default connect(mapDispatchToState, null)(MessagesList);
