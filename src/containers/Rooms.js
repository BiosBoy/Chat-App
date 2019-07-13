import { connect } from 'react-redux';
import Rooms from '../components/Sidebar/Rooms';

const mapStateToProps = state => ({
  rooms: state.chats.rooms
});

export default connect(
  mapStateToProps,
  null
)(Rooms);
