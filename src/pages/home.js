import React from 'react/addons';
import HelloWorld from '../components/hello-world';
import Link from '../components/link';
import Header from '../components/header';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="header" transitionAppear={true}>
          <Header/>
        </ReactCSSTransitionGroup>
        <h1>Home Page</h1>
        <HelloWorld greeting="Hi" name="React" />
        <Link href="/todo">Todo</Link>
      </div>
    );
  }
}
