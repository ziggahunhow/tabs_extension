import React, { Component } from 'react';
import AuthMethods from './AuthMethods';
import { history } from './history';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    componentDidMount() {
      if (!AuthMethods.loggedIn()) {
        history.push('/');
      }
    }
    render() {
      return <AuthComponent />;
    }
  };
}
