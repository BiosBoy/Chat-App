import React, { PureComponent } from 'react';
import './App.css';
import UsersList from './containers/UsersList';
import MessagesList from './containers/MessagesList';
import AddMessage from './containers/AddMessage';

class App extends PureComponent {
  render() {
    return (
      <div className='mainWrap'>
        <div className='appTitle'>Real-Time Chat App v.0.0.1</div>
        <div id='container'>
          <UsersList />
          <section id='main'>
            <MessagesList />
            <AddMessage />
          </section>
        </div>
        <div className='appCredits'>Just for Fun! By Sviatoslav Kuzhelev. 2019</div>
      </div>
    );
  }
}

export default App;
