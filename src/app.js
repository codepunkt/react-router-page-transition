import React from 'react/addons';
import Router, { Link } from 'react-router';
import './styles/main.css';

// @todo alias to nothing with webpack in production
import a11y from 'react-a11y'
a11y(React);

class Header extends React.Component {
  render() {
    return (
      <header className='header' role='banner'>
        <div className='container'>
          <div className='row'>
            <h1 className='logo col-xs-3'>OMWeb</h1>
            <nav className='menu col-xs-9' role='navigation'>
              <ul className='menu_list'>
                <li className='menu_item'>
                  <Router.Link className='menu_link' activeClassName='menu_link-active' to='home_page'>
                    Home
                  </Router.Link>
                </li>
                <li className='menu_item'>
                  <Router.Link className='menu_link' activeClassName='menu_link-active' to='first_page'>
                    Page #1
                  </Router.Link>
                </li>
                <li className='menu_item'>
                  <Router.Link className='menu_link' activeClassName='menu_link-active' to='second_page'>
                    Page #2
                  </Router.Link>
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
      <React.addons.CSSTransitionGroup transitionName='page' transitionAppear={true}>
        <Router.RouteHandler key={this.context.router.getCurrentPath()}/>
      </React.addons.CSSTransitionGroup>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

class HomePage extends React.Component {
  render() {
    return (
      <div className='page'>
        <Header/>
        <main className='main' role='main'>
          <div className='container'>HomePage</div>
        </main>
      </div>
    );
  }
}

class FirstPage extends React.Component {
  render() {
    return (
      <div className='page'>
        <Header/>
        <main className='main' role='main'>
          <div className='container'>FirstPage</div>
        </main>
      </div>
    );
  }
}

class SecondPage extends React.Component {
  render() {
    return (
      <div className='page'>
        <Header/>
        <main className='main' role='main'>
          <div className='container'>SecondPage</div>
        </main>
      </div>
    );
  }
}

var routes = (
  <Router.Route handler={App}>
    <Router.DefaultRoute name='home_page' handler={HomePage}/>
    <Router.Route path='first' name='first_page' handler={FirstPage}/>
    <Router.Route path='second' name='second_page' handler={SecondPage}/>
  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.body);
});
