import React, { PureComponent } from 'react';

import AppLayout from './layout';
import DebugInfo from './containers/DebugInfo';

class App extends PureComponent {
  // componentDidMount() {
  //   const fetchData = async() => {
  //     const fetchCreds = await fetch('http://localhost:80', {
  //       method: 'get',
  //       credentials: 'include'
  //     });

  //     const responce = await fetchCreds.text();

  //     console.log(responce, 'responce');
  //   };

  //   fetchData();
  // }

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
