import { connect } from 'react-redux';
import MessagesListComponent from '../components/MessagesList';

const mapDispatchToState = state => {
  return ({
    messages: state.messages
  });
};

export default connect(mapDispatchToState, null)(MessagesListComponent);
