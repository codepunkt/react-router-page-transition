import React from 'react';
import { Link, Router, Route, Redirect } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory'
import Helmet from 'react-helmet';
import { Spring, TransitionSpring } from 'react-motion';
import './app.css';
import RouteTransition from './route-transition'
import HeaderTransition from './header-transition'

// @todo alias to nothing with webpack in production
import a11y from 'react-a11y';
a11y(React);

class Header extends React.Component {
  render() {
    let { style } = this.props;

    return (
      <header className="header" role="banner" style={style}>
        <div className="container">
          <div className="row">
            <h1 className="logo col-xs-3">Logo</h1>
            <nav className="menu col-xs-9" role="navigation">
              <ul className="menu_list">
                <li className="menu_item">
                  <Link className="menu_link" activeClassName="menu_link-active" to="/" aria-label="Visit the home page">
                    Shop
                  </Link>
                </li>
                <li className="menu_item">
                  <Link className="menu_link" activeClassName="menu_link-active" to="/cart" aria-label="Show your shopping cart">
                    Cart
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
  render() {
    return (
      <Helmet titleTemplate="%s | Metrolines">
        <HeaderTransition pathname={this.props.location.pathname}>
          {this.props.children}
        </HeaderTransition>
      </Helmet>
    );
  }
}

// @todo double activeClass links?

class Page extends React.Component {
  render() {
    let className = this.props.className
      ? `page ${this.props.className}`
      : 'page';

    return (
      <div className={className}>
        <Helmet title={this.props.title} />
        <Header style={this.props.headerStyle} />
        <main className="main" role="main" style={this.props.mainStyle} >
          <div className="container">{this.props.children}</div>
        </main>
      </div>
    );
  }
}

function animate(prefix) {
  return Component => class Animate extends Component {
    static displayName = `Animate(${Component.displayName || Component.name})`;

    constructor() {
      super();
      this.state = { className: '' };
    }

    applyTransitionClass(className, callback) {
      let node = React.findDOMNode(this);
      let onTransitionEnd = (() => {
        node.removeEventListener('transitionend', onTransitionEnd);
        callback();
      });

      node.addEventListener('transitionend', onTransitionEnd);
      window.setTimeout(() => this.setState({
        className: `${prefix}-${className}`
      }));
    }

    componentWillAppear(callback) {
      this.applyTransitionClass('appear', callback);
    }

    componentWillEnter(callback) {
      this.applyTransitionClass('enter', callback);
    }

    componentWillLeave(callback) {
      this.applyTransitionClass('leave', callback);
    }

    render() {
      return (
        <Component className={this.state.className} />
      );
    }
  };
}

// @animate('page')
class Shop extends React.Component {
  render() {
    return (
      <Page key="shop" title="Shop" {...this.props}>
        Shop
      </Page>
    );
  }
}

// @animate('page')
class Cart extends React.Component {
  render() {
    return (
      <Page key="cart" title="Cart" {...this.props}>
        Cart
      </Page>
    );
  }
}

React.render((
  <Router history={new BrowserHistory}>
    <Route component={App}>
      <Route path="/" component={Shop} />
      <Route path="cart" component={Cart} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.body);
