import { connect } from 'react-redux';
import Chat from '../components/Main/Chat';

const mapDispatchToState = state => {
  return ({
    chats: state.chats,
    currentUserName: state.currentUser.name,
    currentChat: state.currentChat
  });
};

export default connect(
  mapDispatchToState,
  null
)(Chat);
