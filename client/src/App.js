import React from 'react';
import Layout from './components/Layout';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';

import { routes } from './helpers/routes';
import { history } from './helpers/history';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    // <BrowserRouter>
    <Router history={history}>
      <div className="app">
        <Layout>
          {Object.keys(routes)
            .filter(route => routes[route].component)
            .map(route => (
              <Route {...routes[route]} key={route} />
            ))}
        </Layout>
      </div>
    </Router>
    //</BrowserRouter>
  );
}
