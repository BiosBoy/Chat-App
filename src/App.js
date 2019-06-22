import React, { PureComponent } from 'react';

import AppLayout from './layout';
import DebugInfo from './containers/DebugInfo';

class App extends PureComponent {
  componentDidMount() {
    // getting cockies in dev mode. No need in this while production
    if (__DEV__) {
      const getCookie = async() => {
        await fetch('http://localhost:80/', {
          method: 'get',
          credentials: 'include'
        });
      };

      getCookie();
    }
  }

  render() {
    return (
      <div className='mainWrap'>
        <div className='appTitle'>Real-Time Chat App v.0.0.1</div>
        <AppLayout />
        <DebugInfo />
        <div className='appCredits'>Just for Fun! By Sviatoslav Kuzhelev. 2019</div>
      </div>
    );
  }
}

export default App;
