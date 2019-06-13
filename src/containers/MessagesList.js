import { connect } from 'react-redux';
import { MessagesList } from '../components';

const mapDispatchToState = state => {
  return ({
    messages: state.messages
  });
};

export default connect(mapDispatchToState, null)(MessagesList);
