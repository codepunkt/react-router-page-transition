import React from 'react/addons';
import Link from '../components/link';
import TodoList from '../components/todo-list';
import Header from '../components/header';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class TodoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false,
      items: [],
      text: ''
    };
  }

  toggleOnOff(e) {
    this.setState({ on: !this.state.on });
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      items: this.state.items.concat([this.state.text]),
      text: ''
    });
  }

  render() {
    var key = this.state.on ? 'on' : 'off';

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="header" transitionAppear={true}>
          <Header key={key}/>
        </ReactCSSTransitionGroup>
        <h1>Todo Page</h1>
        <TodoList items={this.state.items} />
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <p><Link href="/">Back to home</Link></p>
      </div>
    );
  }
}
