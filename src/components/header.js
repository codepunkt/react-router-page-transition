import React from 'react';

export default class HeaderComponent extends React.Component {
  componentWillEnter(callback) {
    console.log('componentWillEnter');
    callback();
  }

  componentDidEnter() {
    console.log('componentDidEnter');
  }

  componentWillLeave(callback) {
    console.log('componentWillLeave');
    callback();
  }

  componentDidLeave() {
    console.log('componentDidLeave');
  }

  render() {
    return <header className='header'>header</header>;
  }
}
