import app from 'ampersand-app';
import Router from 'ampersand-router';
import React from 'react';
import HomePage from './pages/home';
import TodoPage from './pages/todo';

export default Router.extend({
  routes: {
    '': 'home',
    'todo': 'todo'
  },

  home() {
    app.page = React.render(<HomePage/>, document.body);
  },

  todo() {
    app.page = React.render(<TodoPage/>, document.body);
  }
});
