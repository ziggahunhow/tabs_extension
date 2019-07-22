import SignUp from '../components/Login/SignUp';
import Home from '../components/Home';
import Login from '../components/Login/Login';
import Tabs from '../components/Tabs';
import WithAuth from './WithAuth';

export const routes = {
  loginPage: {
    path: '/login',
    component: Login
  },
  registerPage: {
    path: '/register',
    component: SignUp
  },
  homePage: {
    path: '/',
    component: Home,
    exact: true
  },
  tabsPage: {
    path: '/tabs',
    component: WithAuth(Tabs)
  }

  // error500Page: {
  //   path: '/error-500',
  //   component: Error500
  // },
  // Place your component before PageNotFound!
  // PageNotFound: {
  //   component: PageNotFound,
  // },
};

export default routes;
