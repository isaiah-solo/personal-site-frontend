import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom'

import RightColumn from '../components/RightColumn';
import BlogPage from '../components/BlogPage';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';

import Nav from '../components/Nav';
import Page from '../components/Page';

export default class App extends React.Component {
  state = {
    profile: {},
  }

  componentDidMount = () => {
    fetch('/api/static/profile', {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then(profile => this.setState(profile))
        .catch(error => console.log(error));
  };

  render = () => {
    const navLinks = [
      {to: '/', label: 'home'},
      {to: '/blog', label: 'blog'}
    ];
    const navRoutes = {
      pages: [
        {path: '/', component: HomePage},
        {path: '/blog', component: BlogPage}
      ],
      notFound: {path: '*', component: NotFoundPage}
    };

    const {headline, icons, name} = this.state.profile;
    const text = [];

    if (name) text.push(name);
    if (headline) text.push(headline);

    return (
      <Router>
        <React.Fragment>
          <RightColumn text={text} icons={icons} />
          <Nav links={navLinks} />
          <Page routes={navRoutes} />
        </React.Fragment>
      </Router>
    );
  };
}

