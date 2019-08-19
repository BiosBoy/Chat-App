import { connect } from 'react-redux';
import Unit from '../components/Sidebar/Unit';
import { chatSelected, createNewDirectChat } from '../controller/actions';

const mapStateToProps = state => ({
  unreadedMessages: state.common.unreadedMessages,
  currentUser: state.currentUser,
  currentChat: state.currentChat,
  chats: state.chats
});

const mapDispatchToState = dispatch => ({
  createNewDirectChat: chatConfig => dispatch(createNewDirectChat(chatConfig)),
  chatSelected: chatConfig => dispatch(chatSelected(chatConfig))
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Unit);
