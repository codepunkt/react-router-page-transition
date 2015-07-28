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
      <React.addons.CSSTransitionGroup transitionName="page" transitionAppear={true}>
        {this.renderChildren()}
      </React.addons.CSSTransitionGroup>
    );
  }
}

// @todo context.router.state.location.pathname instead of getCurrentPath?
// @todo double activeClass links?

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

class Page extends React.Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <div className="page">
          <Header />
          <main className="main" role="main">
            <div className="container">{this.props.children}</div>
          </main>
        </div>
      </DocumentTitle>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <Page title="Home Page">
        Home Page
      </Page>
    );
  }
}

class FirstPage extends React.Component {
  render() {
    return (
      <Page title="First Page">
        First Page
      </Page>
    );
  }
}

class SecondPage extends React.Component {
  render() {
    return (
      <Page title="Second Page">
        Second Page
      </Page>
    );
  }
}

React.render((
  <Router history={new BrowserHistory}>
    <Route component={App}>
      <Route path="/" component={HomePage} />
      <Route path="first" component={FirstPage} />
      <Route path="second" component={SecondPage} />
    </Route>
  </Router>
), document.body);
