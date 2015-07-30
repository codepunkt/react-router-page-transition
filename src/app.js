import React from 'react/addons';
import { Link, Router, Route } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory'
import DocumentTitle from 'react-document-title';
import './app.css';

// @todo alias to nothing with webpack in production
import a11y from 'react-a11y';
a11y(React);

class Header extends React.Component {
  render() {
    return (
      <header className="header" role="banner">
        <div className="container">
          <div className="row">
            <h1 className="logo col-xs-3">Logo</h1>
            <nav className="menu col-xs-9" role="navigation">
              <ul className="menu_list">
                <li className="menu_item">
                  <Link className="menu_link" activeClassName="menu_link-active" to="/">
                    Home
                  </Link>
                </li>
                <li className="menu_item">
                  <Link className="menu_link" activeClassName="menu_link-active" to="/first">
                    Page #1
                  </Link>
                </li>
                <li className="menu_item">
                  <Link className="menu_link" activeClassName="menu_link-active" to="/second">
                    Page #2
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

class App extends React.Component {
  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, {
        key: this.props.location.pathname
      });
    });
  }

  render() {
    return (
      <React.addons.TransitionGroup transitionName="page" transitionAppear={true}>
        {this.renderChildren()}
      </React.addons.TransitionGroup>
    );
  }
}

// @todo double activeClass links?

class Page extends React.Component {
  render() {
    let className = this.props.className ? `page ${this.props.className}` : 'page';

    return (
      <DocumentTitle title={this.props.title}>
        <div className={className}>
          <Header />
          <main className="main" role="main">
            <div className="container">{this.props.children}</div>
          </main>
        </div>
      </DocumentTitle>
    );
  }
}

function animate() {
  const TICK = 17;

  return Component => class Page extends Component {
    static displayName = `Page(${Component.displayName || Component.name})`;

    constructor() {
      super();
      this.state = { className: '' };
    }

    setClassName(name) {
      this.setState({ className: `page-${name}` });
    }

    componentWillAppear(callback) {
      React.findDOMNode(this).addEventListener('transitionend', callback);
      setTimeout((() => this.setClassName('appear')), TICK);
    }

    componentWillEnter(callback) {
      React.findDOMNode(this).addEventListener('transitionend', callback);
      setTimeout((() => this.setClassName('enter')), TICK);
    }

    componentWillLeave(callback) {
      React.findDOMNode(this).addEventListener('transitionend', callback);
      setTimeout((() => this.setClassName('leave')), TICK);
    }

    render() {
      return <Component className={this.state.className} />;
    }
  };
}

@animate()
class HomePage extends React.Component {
  render() {
    return (
      <Page title="Home Page" {...this.props}>
        Home Page
      </Page>
    );
  }
}

@animate()
class FirstPage extends React.Component {
  render() {
    return (
      <Page title="First Page" {...this.props}>
        First Page
      </Page>
    );
  }
}

@animate()
class SecondPage extends React.Component {
  render() {
    return (
      <Page title="Second Page" {...this.props}>
        Second Page
      </Page>
    );
  }
}

React.render((
  <Router history={new BrowserHistory}>
    <Route component={App}>
      <Route path="/" component={HomePage} />
      <Route path="/first" component={FirstPage} />
      <Route path="/second" component={SecondPage} />
    </Route>
  </Router>
), document.body);
